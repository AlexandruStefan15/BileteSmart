import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Fontisto from "react-native-vector-icons/Fontisto";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Zocial from "react-native-vector-icons/Zocial";

export const ICON_LIBS = {
	ad: AntDesign,
	en: Entypo,
	ei: EvilIcons,
	fe: Feather,
	fa: FontAwesome,
	fa5: FontAwesome5,
	fa6: FontAwesome6,
	fo: Fontisto,
	fd: Foundation,
	io: Ionicons,
	mci: MaterialCommunityIcons,
	mi: MaterialIcons,
	oc: Octicons,
	sl: SimpleLineIcons,
	zo: Zocial,
};

const Icon = React.memo(function Icon({
	lib = "fa",
	name,
	size = 20,
	color = "#000",
	style,
	...rest
}) {
	const IconLib = ICON_LIBS[lib] || FontAwesome;
	if (!name) return null;

	return <IconLib name={name} size={size} color={color} style={style} {...rest} />;
});

export default Icon;
