'use client';

import './tailwind.css';
import React from "react";

const ReportForm = () => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Tại sao bạn lại báo cáo vấn đề này?</h2>
            <form>
                <div className="space-y-3">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="offensiveContent"
                            className="mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="offensiveContent" className="text-gray-700">
                            Nội dung thù địch
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="sexualContent"
                            className="mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="sexualContent" className="text-gray-700">
                            Nội dung xúc phạm hoặc khiêu dâm
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="spamContent"
                            className="mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="spamContent" className="text-gray-700">
                            Thư rác hoặc quảng cáo
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="irrelevantInfo"
                            className="mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="irrelevantInfo" className="text-gray-700">
                            Thông tin không liên quan hoặc sai lệch
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="personalInfo"
                            className="mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="personalInfo" className="text-gray-700">
                            Chứa thông tin cá nhân
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="driverComments"
                            className="mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="driverComments" className="text-gray-700">
                            Nhận xét là về tài xế
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                    Tiếp tục
                </button>
            </form>
        </div>
    );
};

export default ReportForm;
