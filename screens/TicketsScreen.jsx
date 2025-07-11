import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";
import { Colors } from "@/constants";
import { useFocusEffect } from "@react-navigation/native";

//store
import { useDrawerStore } from "@/store/store";

//components
import Header from "@/components/Header";
import Orders from "@/components/Orders";

const ordersData = [
	{
		id_order: "2177",
		order_code: "633959102177",
		code: "633959102177",
		first_name: "john",
		last_name: "Bongiovi",
		email: "zyx_sprite@yahoo.com",
		phone: "0770408956",
		movie: "Test 31.07",
		total: "2.02",
		taxes: "0.02",
		is_season_ticket: "1",
		buy_date: "2023-07-03 17:06:14",
		date: "2025-07-10 21:14:36",
		active_renew: "0",
		id_season_type_new: null,
		tickets: [
			{
				id_order: "2177",
				room: "A1",
				seats_label: "14/3",
				seats_count: "49016",
				ticket_fees: "Abonament Test",
				ticket_prices: "1.00",
				ticket_codes: "3494473236281",
				total: "2.02",
				ticket_series: " 0",
				buy_date: "2023-07-03 17:06:14",
				room_type: "A1 A4 B1 B4",
				taxes: "0.02",
				is_season_ticket: "1",
			},
			{
				id_order: "2177",
				room: "A1",
				seats_label: "14/4",
				seats_count: "49017",
				ticket_fees: "Abonament Test",
				ticket_prices: "1.00",
				ticket_codes: "7556843161314",
				total: "2.02",
				ticket_series: " 0",
				buy_date: "2023-07-03 17:06:14",
				room_type: "A1 A4 B1 B4",
				taxes: "0.02",
				is_season_ticket: "1",
			},
		],
	},
	{
		id_order: "2186",
		order_code: "247531302186",
		code: "247531302186",
		first_name: "Bongiovi",
		last_name: "John",
		email: "zyx_sprite@yahoo.com",
		phone: "0770408956",
		movie: "Test 31.07",
		total: "202.00",
		taxes: "2.00",
		is_season_ticket: "1",
		buy_date: "2023-07-11 12:49:27",
		date: "2025-07-10 21:14:36",
		active_renew: "0",
		id_season_type_new: null,
		tickets: [
			{
				id_order: "2186",
				room: "B2",
				seats_label: "14/1",
				seats_count: "46810",
				ticket_fees: "Abonament A2 A3 B2 B3 Premium",
				ticket_prices: "200.00",
				ticket_codes: "1269573154494",
				total: "202.00",
				ticket_series: " 0",
				buy_date: "2023-07-11 12:49:27",
				room_type: "A2 A3 B2 B3",
				taxes: "2.00",
				is_season_ticket: "1",
			},
		],
	},
	{
		id_order: "2204",
		order_code: "391461602204",
		code: "391461602204",
		first_name: "john",
		last_name: "bonjovi",
		email: "zyx_sprite@yahoo.com",
		phone: "0770408956",
		movie: "Test 31.07",
		total: "15.15",
		taxes: "0.15",
		is_season_ticket: "1",
		buy_date: "2023-07-15 15:30:10",
		date: "2025-07-10 21:14:36",
		active_renew: "0",
		id_season_type_new: null,
		tickets: [
			{
				id_order: "2204",
				room: "B1",
				seats_label: "4/11",
				seats_count: "49504",
				ticket_fees: "Abonament Finale Duminica",
				ticket_prices: "15.00",
				ticket_codes: "1981943134327",
				total: "15.15",
				ticket_series: "ACSG 0",
				buy_date: "2023-07-15 15:30:10",
				room_type: "A1 A4 B1 B4",
				taxes: "0.15",
				is_season_ticket: "1",
			},
		],
	},
	{
		id_order: "2205",
		order_code: "615232802205",
		code: "615232802205",
		first_name: "yu",
		last_name: "yu",
		email: "zyx_sprite@yahoo.com",
		phone: "0770408956",
		movie: "Abonament Semifinale Vineri",
		total: "15.15",
		taxes: "0.15",
		is_season_ticket: "1",
		buy_date: "2023-07-16 20:01:24",
		date: "2025-07-10 21:14:36",
		active_renew: "0",
		id_season_type_new: null,
		tickets: [
			{
				id_order: "2205",
				room: "B0",
				seats_label: "1/17",
				seats_count: "49585",
				ticket_fees: "Abonament Semifinale Vineri",
				ticket_prices: "15.00",
				ticket_codes: "7195848865864",
				total: "15.15",
				ticket_series: "ACSG 1",
				buy_date: "2023-07-16 20:01:24",
				room_type: "A0 A5 B0 B5",
				taxes: "0.15",
				is_season_ticket: "1",
			},
		],
	},
];

const TicketsScreen = ({ navigation, route }) => {
	const closeDrawer = useDrawerStore((state) => state.closeDrawer);

	useFocusEffect(
		React.useCallback(() => {
			closeDrawer();
		}, [])
	);

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Orders orders={ordersData} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},
});

export default TicketsScreen;
