
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Exclusive Deals
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Subscribe to our newsletter and get 15% off your first order, plus early access to sales and new vendor arrivals.
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-blue-100 focus:bg-white/20"
            />
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6">
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-blue-200 text-xs mt-4">
            Join 500K+ subscribers • No spam, unsubscribe anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;