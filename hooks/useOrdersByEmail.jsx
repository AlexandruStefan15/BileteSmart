import { useState, useEffect, useCallback } from "react";

const BASE_URL = "https://biletesmart.ro/api/stadium/getOrdersByEmail/1";

export const useOrdersByEmail = (email) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchOrders = useCallback(async () => {
		if (!email) return;

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`${BASE_URL}/${encodeURIComponent(email)}`);
			if (!response.ok) throw new Error("Failed to fetch orders");

			const data = await response.json();
			setOrders(data);
		} catch (err) {
			setError(err.message || "Unknown error");
			setOrders([]);
		} finally {
			setLoading(false);
		}
	}, [email]);

	useEffect(() => {
		fetchOrders();
	}, [fetchOrders]);

	return { orders, loading, error, refetch: fetchOrders };
};
