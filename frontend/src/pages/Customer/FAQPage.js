import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import SingleFAQ from '../../components/FAQ/SingleFAQ';

const FAQPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const { setActive } = useOutletContext();

	useEffect(() => {
        setActive(5);
		window.scrollTo(0,0);
	}, [])


    const toggleTab = (tab) => {
        if (activeTab === tab) {
            setActiveTab(0);
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <div className='section my-8'>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
            <div className="mx-auto space-y-4">
                {/* single Faq */}
                <SingleFAQ index={1} activeTab={activeTab} toggleTab={toggleTab} 
                    question='What is your return policy?' 
                    answer="If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email
                            us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item."
                />
                <SingleFAQ index={2} activeTab={activeTab} toggleTab={toggleTab} 
                    question='How do I track my order?' 
                    answer="You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on 
                            our website and viewing the order details."
                />
                <SingleFAQ index={3} activeTab={activeTab} toggleTab={toggleTab} 
                    question='How do I contact customer support?' 
                    answer="You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567
                            between the hours of 9am and 5pm EST, Monday through Friday."
                />
                <SingleFAQ index={4} activeTab={activeTab} toggleTab={toggleTab} 
                    question='Can I change or cancel my order?' 
                    answer="Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items
                            you've ordered, you can return them for a refund within 30 days of delivery."
                />
                <SingleFAQ index={5} activeTab={activeTab} toggleTab={toggleTab} 
                    question='Do you offer international shipping?' 
                    answer="Currently, we only offer shipping within China."
                />
                <SingleFAQ index={6} activeTab={activeTab} toggleTab={toggleTab} 
                    question='What payment methods do you accept?' 
                    answer="We accept visa,mastercard,paypal payment method also we have cash on delivery system."
                />
            </div>
        </div>
    )
}

export default FAQPage