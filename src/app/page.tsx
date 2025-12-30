"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calculator, Banknote, Receipt, Wallet, UserCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SalaryCalculator() {
  const [shiftPrice, setShiftPrice] = useState<number>(0);
  const [numShifts, setNumShifts] = useState<number>(0);
  const [hasInsurance, setHasInsurance] = useState<boolean>(true);
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState<any>(null);

  const calculations = useMemo(() => {
    const grossMonthly = (shiftPrice || 0) * (numShifts || 0);
    const grossAnnual = grossMonthly * 12;

    const insuranceMonthly = hasInsurance ? Math.min(grossMonthly, 14500) * 0.11 : 0;
    const insuranceAnnual = insuranceMonthly * 12;

    const personalExemption = 20000;
    const taxableAnnual = Math.max(0, grossAnnual - insuranceAnnual - personalExemption);

    let remainingTaxable = taxableAnnual;
    let annualTax = 0;

    const brackets = [
      { limit: 40000, rate: 0 },
      { limit: 15000, rate: 0.10 },
      { limit: 15000, rate: 0.15 },
      { limit: 130000, rate: 0.20 },
      { limit: 200000, rate: 0.225 },
      { limit: 800000, rate: 0.25 },
      { limit: Infinity, rate: 0.275 },
    ];

    for (const bracket of brackets) {
      if (remainingTaxable <= 0) break;
      const amountInBracket = Math.min(remainingTaxable, bracket.limit);
      annualTax += amountInBracket * bracket.rate;
      remainingTaxable -= amountInBracket;
    }

    const monthlyTax = annualTax / 12;
    const netMonthly = grossMonthly - insuranceMonthly - monthlyTax;

    return {
      grossMonthly,
      insuranceMonthly,
      monthlyTax,
      netMonthly,
      grossAnnual,
      annualTax,
    };
  }, [shiftPrice, numShifts, hasInsurance]);

  const handleCalculate = () => {
    if (shiftPrice > 0 && numShifts > 0) {
      setResults(calculations);
      setIsCalculated(true);
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(val);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans relative overflow-x-hidden" dir="rtl">
      {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="fixed top-4 left-4 z-50 flex flex-col items-center gap-2"
        >
          <div className="relative group">
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full p-1 bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-500 shadow-2xl preserve-3d"
            >
              <div className="w-full h-full rounded-full border-2 border-white/50 overflow-hidden bg-white shadow-inner">
                <img
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/f82edd60-973c-431f-bae0-403e8542384a/20251201_150100-1767090371030.jpg?width=8000&height=8000&resize=contain"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            {/* Decorative Ring */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-3 rounded-full border-2 border-slate-300/30 blur-md"
            />
          </div>
          
          {/* Silver Name with Black Background - Abu Tamim */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
              duration: 0.8
            }}
            className="text-2xl md:text-3xl font-bold bg-black px-4 py-2 rounded-xl shadow-2xl relative overflow-hidden group border border-slate-800"
            style={{ 
              fontFamily: "'LaylaDiwaniRegular', 'Diwani Letter', 'Traditional Arabic', serif",
            }}
          >
            <motion.span 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="relative z-10 bg-gradient-to-r from-slate-400 via-white to-slate-500 bg-[length:200%_auto] bg-clip-text text-transparent"
              style={{
                filter: "drop-shadow(0 0 1px rgba(255,255,255,0.8))",
                WebkitTextStroke: "0.2px rgba(255,255,255,0.3)"
              }}
            >
              أبو تميم
            </motion.span>
            {/* Glossy Overlay */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
          </motion.div>
        </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4 pt-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200"
          >
            <Calculator className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">حاسبة صافي المرتب</h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            احسب دخلك الصافي بعد الضرائب والتأمينات وفقاً لأحدث القوانين المصرية (2024/2025)
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Input Section */}
          <Card className="md:col-span-5 border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Banknote className="w-5 h-5 text-blue-600" />
                بيانات الدخل
              </CardTitle>
              <CardDescription>أدخل تفاصيل الشفتات الخاصة بك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="shiftPrice" className="text-slate-700 font-semibold">سعر الشفت (ج.م)</Label>
                <Input
                  id="shiftPrice"
                  type="number"
                  placeholder="0.00"
                  className="h-12 text-lg border-slate-200 focus:ring-blue-500"
                  onChange={(e) => {
                    setShiftPrice(Number(e.target.value));
                    setIsCalculated(false);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numShifts" className="text-slate-700 font-semibold">عدد الشفتات في الشهر</Label>
                <Input
                  id="numShifts"
                  type="number"
                  placeholder="0"
                  className="h-12 text-lg border-slate-200 focus:ring-blue-500"
                  onChange={(e) => {
                    setNumShifts(Number(e.target.value));
                    setIsCalculated(false);
                  }}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <Label htmlFor="insurance-toggle" className="text-slate-700 font-semibold cursor-pointer">تطبيق التأمينات الاجتماعية</Label>
                  <p className="text-xs text-slate-500">خصم 11% من الراتب للتأمينات</p>
                </div>
                <Switch
                  id="insurance-toggle"
                  checked={hasInsurance}
                  onCheckedChange={(checked) => {
                    setHasInsurance(checked);
                    setIsCalculated(false);
                  }}
                />
              </div>
              
              <Button 
                onClick={handleCalculate}
                className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
              >
                <Send className="w-5 h-5 ml-2" />
                احسب المرتب
              </Button>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mt-4">
                <div className="flex justify-between items-center text-slate-600 font-medium">
                  <span>إجمالي الدخل قبل الاستقطاع:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(calculations.grossMonthly)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Result Section */}
          <div className="md:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              {isCalculated && results ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <Card className="border-none shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Wallet className="w-32 h-32 rotate-12" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl opacity-90 font-medium">الصافي النهائي</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-8">
                      <div className="text-5xl md:text-6xl font-black mb-2 tracking-tighter">
                        {formatCurrency(results.netMonthly)}
                      </div>
                      <p className="text-blue-100 text-sm font-medium">شهرياً بعد كافة الاستقطاعات</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                      <CardContent className="pt-6 flex items-start gap-4">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <Receipt className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <p className="text-slate-500 text-sm font-medium">الضرائب (شهرياً)</p>
                          <p className="text-xl font-bold text-slate-900">{formatCurrency(results.monthlyTax)}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                      <CardContent className="pt-6 flex items-start gap-4">
                        <div className="p-3 bg-amber-50 rounded-lg">
                          <UserCircle className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-slate-500 text-sm font-medium">التأمينات {hasInsurance ? '(11%)' : '(ملغاة)'}</p>
                          <p className="text-xl font-bold text-slate-900">{formatCurrency(results.insuranceMonthly)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-none shadow-md bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">تفاصيل سنوية</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">إجمالي الدخل السنوي</span>
                        <span className="font-semibold text-slate-900">{formatCurrency(results.grossAnnual)}</span>
                      </div>
                      <Separator className="bg-slate-100" />
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">إجمالي الضرائب السنوية</span>
                        <span className="font-semibold text-red-600">{formatCurrency(results.annualTax)}</span>
                      </div>
                      <Separator className="bg-slate-100" />
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">إجمالي التأمينات السنوية</span>
                        <span className="font-semibold text-amber-600">{formatCurrency(results.insuranceMonthly * 12)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 rounded-3xl"
                >
                  <div className="bg-slate-100 p-6 rounded-full mb-4">
                    <Banknote className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">في انتظار البيانات</h3>
                  <p className="text-slate-500">أدخل سعر الشفت وعدد الشفتات للبدء في الحساب</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <footer className="text-center text-slate-400 text-sm pt-8">
          <p>© 2024 حاسبة الرواتب المصرية. تستند الحسابات إلى قوانين الضرائب والتأمينات السارية.</p>
        </footer>
      </div>
    </div>
  );
}
