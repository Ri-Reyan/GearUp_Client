import CheckoutPageClient from "./CheckoutPageClient";

type Props = {
  params: Promise<{
    orderId: string;
  }>;
};

const CheckoutPage = async ({ params }: Props) => {
  const { orderId } = await params;

  return <CheckoutPageClient orderId={orderId} />;
};

export default CheckoutPage;
