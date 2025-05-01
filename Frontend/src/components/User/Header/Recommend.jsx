import React from "react";

export default function Recommend() {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Sản phẩm gợi ý</h2>
            <ul className="flex space-x-4">
                <li className="px-4 py-2 bg-gray-200 rounded-lg">SP3</li>
                <li className="px-4 py-2 bg-gray-200 rounded-lg">SP2</li>
                <li className="px-4 py-2 bg-gray-200 rounded-lg">SP1</li>
            </ul>
        </div>
    );
}
