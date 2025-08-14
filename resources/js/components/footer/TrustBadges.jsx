import { ShieldCheck } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { title: "SSL Secured", desc: "256-bit encryption" },
    { title: "Money Back", desc: "30-day guarantee" },
    { title: "Verified Sellers", desc: "100% authentic products" },
    { title: "Fast Shipping", desc: "2-day delivery available" }
  ];

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
        <ShieldCheck className="h-5 w-5 mr-2 text-green-400" />
        Why Shop With Us
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-colors">
            <h5 className="font-semibold text-white text-sm mb-1">{badge.title}</h5>
            <p className="text-slate-400 text-xs">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
