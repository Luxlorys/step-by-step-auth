import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil } from 'lucide-react';

const Subscriptions = () => {
  const [members, setMembers] = useState<number>(8000);
  const [discountCode, setDiscountCode] = useState('');

  const handleMembersChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setMembers(numValue);
  };

  const monthlyPrice = members * 3;
  const yearlyPrice = members * 2.25;

  return (
    <div className="space-y-6">
      {/* Header with buttons */}
      <div className="flex justify-end gap-2">
        <Input
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-auto"
        />
        <Button className="bg-foreground text-background hover:bg-foreground/90">
          Subscribe and Pay
        </Button>
      </div>

      {/* Pricing Tabs */}
      <div className="bg-[#FAFAFA] border border-[#E2E8F0] rounded-lg p-6">
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="mt-6">
            <div className="max-w-md mx-auto">
              <div className="relative bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-foreground text-background px-3 py-1 rounded-xl text-sm">
                    Matching
                  </span>
                </div>
                
                <div className="text-center space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Members</label>
                    <div className="flex items-center justify-center gap-2">
                      <Input
                        type="number"
                        value={members}
                        onChange={(e) => handleMembersChange(e.target.value)}
                        className="text-center text-xl font-semibold h-12 w-32"
                      />
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Price / per month</p>
                    <p className="text-3xl font-bold">${monthlyPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-6">
            <div className="max-w-md mx-auto">
              <div className="relative bg-white border-2 border-gray-300 rounded-lg p-6">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-foreground text-background px-3 py-1 rounded-xl text-sm">
                    Matching
                  </span>
                </div>
                
                <div className="text-center space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Members</label>
                    <div className="flex items-center justify-center gap-2">
                      <Input
                        type="number"
                        value={members}
                        onChange={(e) => handleMembersChange(e.target.value)}
                        className="text-center text-xl font-semibold h-12 w-32"
                      />
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Price / per year</p>
                    <p className="text-3xl font-bold">${yearlyPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Details */}
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
        <p className="text-sm text-gray-600 mb-6">Here you can manage your payment methods</p>
        
        <div className="space-y-4">
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Payment method</p>
              <p className="text-sm text-gray-600">Stripe Link</p>
            </div>
            <button className="w-[132px] h-[40px] bg-[#F1F5F9] border border-black rounded-lg flex items-center justify-center gap-2 text-sm">
              <Pencil className="h-4 w-4" />
              Edit method
            </button>
          </div>
          
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Billed to</p>
              <p className="text-sm text-gray-600">Kings Place, 90 York Way, London, N1 9FX, United Kingdom</p>
            </div>
            <button className="w-[132px] h-[40px] bg-[#F1F5F9] border border-black rounded-lg flex items-center justify-center gap-2 text-sm">
              <Pencil className="h-4 w-4" />
              Edit info
            </button>
          </div>
          
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">VAT/GST number</p>
              <p className="text-sm text-gray-600">4567-7834</p>
            </div>
            <button className="w-[132px] h-[40px] bg-[#F1F5F9] border border-black rounded-lg flex items-center justify-center gap-2 text-sm">
              <Pencil className="h-4 w-4" />
              Edit number
            </button>
          </div>
          
          <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Billing email</p>
              <p className="text-sm text-gray-600">useremail@company.com</p>
            </div>
            <button className="w-[132px] h-[40px] bg-[#F1F5F9] border border-black rounded-lg flex items-center justify-center gap-2 text-sm">
              <Pencil className="h-4 w-4" />
              Edit email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;