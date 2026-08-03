const getOrderStatus = (status: string) => {
  switch (status) {
    case "PLACED":
      return {
        badge: "bg-yellow-100 text-yellow-700",
      };

    case "CONFIRMED":
      return {
        badge: "bg-blue-100 text-blue-700",
      };

    case "PAID":
      return {
        badge: "bg-purple-100 text-purple-700",
      };

    case "PICKED_UP":
      return {
        badge: "bg-green-100 text-green-700",
      };

    case "RETURNED":
      return {
        badge: "bg-gray-100 text-gray-700",
      };

    case "CANCELLED":
      return {
        badge: "bg-red-100 text-red-700",
      };

    default:
      return {
        badge: "bg-slate-100 text-slate-700",
      };
  }
};

export default getOrderStatus;
