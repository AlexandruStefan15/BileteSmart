// context/SelectedSeatsContext.js

export const useSelectedSeatsByIds = (seatIds, seats) => {
	return useMemo(() => {
		return seats.filter((s) => seatIds.has(s.id_seat));
	}, [seatIds, seats]);
};
