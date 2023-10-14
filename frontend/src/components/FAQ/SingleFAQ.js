import React from 'react'

const SingleFAQ = ({ index, activeTab, toggleTab, question, answer }) => {
    return (
        <div className="border-b border-gray-200 pb-4">
            <button className="flex items-center justify-between w-full" onClick={() => toggleTab(index)}>
                <span className="text-lg font-medium text-gray-900">
                    {question}
                </span>
                { activeTab === index 
                ? <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                : <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                }
            </button>
            { activeTab === index && (
            <div className="mt-4">
                <p className="text-base text-gray-500">
                {answer}
                </p>
            </div>
            )}
        </div>
    )
}

export default SingleFAQ