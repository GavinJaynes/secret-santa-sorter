import { Button } from "@/components/ui/button";

export default function ChristmasButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-green-100 rounded-lg">
      <Button
        className="relative overflow-hidden bg-white text-red-500 hover:text-white transition-colors duration-300 ease-in-out
             border-4 border-red-500 rounded-full px-8 py-3 font-bold text-lg
             before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full
             before:bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#dc2626_10px,#dc2626_20px)]
             before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
             after:content-[''] after:absolute after:inset-0 after:bg-red-500 after:opacity-0 hover:after:opacity-70 after:transition-opacity after:duration-300"
      >
        <span className="relative z-10">Candy Cane</span>
      </Button>

      <Button
        className="relative bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out
                   border-4 border-gold rounded-lg px-8 py-3 font-bold text-lg
                   before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-0.5 before:bg-gold
                   after:content-[''] after:absolute after:top-0 after:left-1/2 after:w-0.5 after:h-full after:bg-gold"
      >
        Gift Wrapped
      </Button>
    </div>
  );
}
