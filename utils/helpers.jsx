import React from "react";
import BoldText from "@/components/BoldText";

export const renderDescription = (text, boldPhrase) => {
	if (!text || !boldPhrase) return null;

	const index = text.indexOf(boldPhrase);

	if (index === -1) {
		return <Text>{text}</Text>;
	}

	const afterBold = text.slice(index + boldPhrase.length);

	return (
		<Text style={{ lineHeight: 22 }}>
			<BoldText>{boldPhrase}</BoldText>
			{afterBold}
		</Text>
	);
};
