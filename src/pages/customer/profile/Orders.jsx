import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../../../redux/features/authSlice";

const Orders = () => {
    const user = useSelector(selectUser);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user || !user.id) return;
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `https://exe-api-dev-bcfpenbhf2f8a9cc.southeastasia-01.azurewebsites.net/api/Orders/user/${user.id}`
                );
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    return (
        <div className="profileCard">
            <div className="profileHeader">
                <h2>My Orders</h2>
            </div>
            {loading ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="orderList">
                    {orders.map((order) => (
                        <li key={order.id} className="orderItem">
                            <strong>Order #{order.id}</strong> — {order.status} —{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;
