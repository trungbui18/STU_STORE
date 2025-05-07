import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np

# 🔹 Kết nối và lấy dữ liệu từ database
def fetch_data():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="thuctaptotnghiep"
    )
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM product")
    products = cursor.fetchall()

    cursor.execute("""
        SELECT orders.profile_id, order_detail.product_id 
        FROM order_detail 
        JOIN orders ON order_detail.order_id = orders.id_order
    """)
    orders = cursor.fetchall()

    cursor.close()
    conn.close()
    return pd.DataFrame(products), pd.DataFrame(orders)

# 🔹 Chuẩn bị dữ liệu ban đầu
df_products, df_orders = fetch_data()

# 🔹 Content-Based Filtering (CBF) setup
if not df_products.empty:
    df_products["content"] = df_products["description"].fillna("")
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df_products["content"])
    cosine_sim_cbf = cosine_similarity(tfidf_matrix)
else:
    cosine_sim_cbf = np.array([])

# 🔹 CBF Recommendation
def get_cbf_recommendations(product_id):
    if df_products.empty or product_id not in df_products["id_product"].values:
        return []

    idx = df_products[df_products["id_product"] == product_id].index[0]
    sim_scores = list(enumerate(cosine_sim_cbf[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Loại bỏ chính sản phẩm đang xét
    sim_scores = [s for s in sim_scores if df_products.iloc[s[0]]["id_product"] != product_id]
    top_indices = [i[0] for i in sim_scores[:4]]
    
    return [int(df_products.iloc[i]["id_product"]) for i in top_indices]

# 🔹 Collaborative Filtering (CF) Recommendation
def get_cf_recommendations(product_id):
    if df_orders.empty:
        return []

    user_item_matrix = df_orders.pivot_table(
        index='profile_id', columns='product_id', aggfunc='size', fill_value=0
    )

    if product_id not in user_item_matrix.columns:
        return []

    product_vector = user_item_matrix[product_id].values.reshape(1, -1)
    cosine_sim_cf = cosine_similarity(product_vector, user_item_matrix.T)

    sim_scores = list(enumerate(cosine_sim_cf[0]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = [s for s in sim_scores if user_item_matrix.columns[s[0]] != product_id]
    top_ids = [user_item_matrix.columns[i[0]] for i in sim_scores[:4]]

    return [int(pid) for pid in top_ids]

# 🔹 Hybrid Recommendation
def get_hybrid_recommendations(product_id):
    cbf_recs = get_cbf_recommendations(product_id)
    cf_recs = get_cf_recommendations(product_id)

    scores = {}
    for pid in cbf_recs:
        scores[pid] = scores.get(pid, 0) + 0.3  # Trọng số nhẹ
    for pid in cf_recs:
        scores[pid] = scores.get(pid, 0) + 0.7  # Trọng số chính

    sorted_recs = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [pid for pid, _ in sorted_recs[:4]]

# 🔹 Flask API
app = Flask(__name__)

@app.route("/recommend", methods=["GET"])
def recommend():
    try:
        product_id = request.args.get("idProduct")
        if not product_id or not product_id.isdigit():
            return jsonify({"error": "Invalid product ID"}), 400
        product_id = int(product_id)
        recommendations = get_hybrid_recommendations(product_id)
        return jsonify(recommendations)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)