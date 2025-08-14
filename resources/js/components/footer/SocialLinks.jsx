import { Facebook, Instagram, Youtube } from "lucide-react";

const SocialLinks = () => {
  const socialLinks = [
    { icon: Facebook, label: "Facebook", followers: "2.5M", color: "hover:bg-blue-600" },
    { icon: Instagram, label: "Instagram", followers: "1.8M", color: "hover:bg-pink-600" },
    { icon: Youtube, label: "YouTube", followers: "850K", color: "hover:bg-red-600" },
  ];

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-6 text-white">Follow Us</h3>
      <div className="flex justify-center space-x-4 mb-6">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href="#"
            className={`bg-slate-700 p-4 rounded-full ${social.color} transition-colors group`}
            aria-label={social.label}
          >
            <social.icon className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </a>
        ))}
      </div>
      <div className="flex justify-center space-x-8 text-sm text-slate-400">
        {socialLinks.map((social, index) => (
          <span key={index}>
            {social.followers} {social.label} followers
          </span>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
