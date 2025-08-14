import { CreditCard } from "lucide-react";

const PaymentMethods = () => {
  const paymentMethods = [
    "Visa", "Mastercard", "Paystack", "PayPal",

  ];

  return (
    <div className="text-center md:text-right">
      <h4 className="text-lg font-semibold mb-4 text-white flex items-center justify-center md:justify-end">
        <CreditCard className="h-5 w-5 mr-2 text-blue-400" />
        Secure Payment Methods
      </h4>
      <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto md:ml-auto md:mr-0">
        {paymentMethods.map((method, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-5 flex items-center justify-center text-xs font-medium text-slate-800 hover:scale-105 transition-transform"
          >
            {method}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
