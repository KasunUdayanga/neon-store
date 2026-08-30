"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Image from "next/image";
import { AlignLeft, AlignCenter, AlignRight, Grid, Image as ImageIcon, Crown, Heart, Star, Zap, Flame, ChevronDown, ArrowLeft } from "lucide-react";

export default function NeonCreator() {
  const [text, setText] = useState("YOUR TEXT");
  const [isOn, setIsOn] = useState(true);
  const [isTransparentBg, setIsTransparentBg] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [showSummary, setShowSummary] = useState(false);
  const { addToCart } = useCart();
  
  const [backing, setBacking] = useState("Cut To Shape");
  const [plugType, setPlugType] = useState("USA/CAN");
  const [isPlugDropdownOpen, setIsPlugDropdownOpen] = useState(false);
  
  const [fontFamily, setFontFamily] = useState("'Monoton', sans-serif");
  const [fontType, setFontType] = useState("Outline");
  const [size, setSize] = useState("Small");
  const [color, setColor] = useState("#FFA500");
  
  const [selectedBg, setSelectedBg] = useState("/wall/wood.jpg"); 
  const [selectedIcon, setSelectedIcon] = useState("none");

  const backgrounds = [
    { id: 1, value: "#3b4154", label: "Dark Studio" },
    { id: 2, value: "/background/1.jpg", label: "Wood Wall" },
    { id: 3, value: "/background/2.jpg", label: "Dark Brick" },
    { id: 4, value: "/background/3.jpg", label: "Concrete" },
    { id: 5, value: "/background/4.jpg", label: "Greenery" },
    { id: 6, value: "/background/5.jpg", label: "Greenery" },
    { id: 7, value: "/background/6.jpg", label: "Greenery" },
  ];

  const getPrice = () => {
    let basePrice = 313.00;
    if (size === "Standard") basePrice = 450.00;
    if (size === "Medium") basePrice = 590.00;
    
    if (backing === "Cut To Letter") basePrice *= 1.075; 
    if (selectedIcon !== "none") basePrice += 45.00; 

    return basePrice;
  };

  const getNeonStyle = (isIcon = false) => {
    if (!isOn) {
      return { 
        fontFamily: isIcon ? "inherit" : fontFamily, 
        color: fontType === "Outline" ? "transparent" : "#3f3f46", 
        textShadow: "none", 
        WebkitTextStroke: fontType === "Outline" ? "2px #52525b" : "0px" 
      };
    }
    
    const isStriped = fontFamily === "'Monoton', cursive" || fontFamily === "'Monoton', sans-serif";

    if (isStriped) {
      return {
        fontFamily,
        color: "#fff", 
        WebkitTextStroke: "0px",
        textShadow: `0 0 5px #fff, 0 0 15px ${color}, 0 0 30px ${color}, 0 0 50px ${color}`
      };
    }
    
    if (fontType === "Outline") {
      return {
        fontFamily: isIcon ? "inherit" : fontFamily,
        color: "transparent", 
        WebkitTextStroke: `2px #fff`, 
        textShadow: `0 0 8px #fff, 0 0 15px ${color}, 0 0 30px ${color}, 0 0 60px ${color}` 
      };
    }

    return {
      fontFamily: isIcon ? "inherit" : fontFamily,
      color: "#fff", 
      WebkitTextStroke: "0px",
      textShadow: `0 0 10px #fff, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
    };
  };

  const getCanvasBackground = () => {
    if (isTransparentBg) {
      return { 
        backgroundImage: "repeating-linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb), repeating-linear-gradient(45deg, #e5e7eb 25%, transparent 25%, transparent 75%, #e5e7eb 75%, #e5e7eb)", 
        backgroundPosition: "0 0, 10px 10px", 
        backgroundSize: "20px 20px",
        backgroundColor: "#f3f4f6"
      };
    }
    if (selectedBg.startsWith('/')) {
      return {
        backgroundImage: `url('${selectedBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return { backgroundColor: selectedBg };
  };

  const renderCanvasIcon = () => {
    const props = { size: 64, style: getNeonStyle(true), className: "mb-4 transition-all duration-300" };
    switch (selectedIcon) {
      case "Crown": return <Crown {...props} />;
      case "Heart": return <Heart {...props} />;
      case "Star": return <Star {...props} />;
      case "Zap": return <Zap {...props} />;
      case "Flame": return <Flame {...props} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[800px]">
      {/* --- LEFT PANEL: THE CANVAS --- */}
      <div 
        className="relative flex-grow rounded-xl overflow-hidden flex flex-col items-center justify-center border border-gray-200 dark:border-zinc-800 shadow-inner transition-all duration-500"
        style={getCanvasBackground()}
      >
        <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />
        
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
          <div className="flex flex-col gap-3">
            <div className="flex bg-white/20 p-1 rounded-md backdrop-blur-md w-max shadow-sm">
              <button onClick={() => setIsOn(true)} className={`px-4 py-1.5 rounded text-sm font-bold transition-all ${isOn ? 'bg-[#00BFFF] text-white shadow-md' : 'text-gray-300 hover:text-white'}`}>ON</button>
              <button onClick={() => setIsOn(false)} className={`px-4 py-1.5 rounded text-sm font-bold transition-all ${!isOn ? 'bg-gray-200 text-gray-800 shadow-md' : 'text-gray-300 hover:text-white'}`}>OFF</button>
            </div>
            <button 
              onClick={() => setIsTransparentBg(!isTransparentBg)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold transition-all shadow-sm backdrop-blur-md border ${isTransparentBg ? 'bg-[#00BFFF] text-white border-[#00BFFF]' : 'bg-white/20 text-gray-200 border-white/30 hover:bg-white/30'}`}
            >
              {isTransparentBg ? <ImageIcon size={16}/> : <Grid size={16}/>}
              {isTransparentBg ? "Wall View" : "Transparent View"}
            </button>
          </div>

          <div className="text-right bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
            <p className="text-3xl font-extrabold text-white">${getPrice().toFixed(2)}</p>
            <p className="text-sm text-gray-300 font-medium">Tax included</p>
          </div>
        </div>

        <div className="relative w-full h-full flex flex-col items-center justify-center p-12 z-10">
          <div className="relative flex flex-col items-center">
            {renderCanvasIcon()}
            
            <div className="absolute -left-12 top-0 bottom-0 w-4 border-l-2 border-t-2 border-b-2 border-white/60 hidden md:block">
              <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-white font-bold text-sm drop-shadow-md">20cm</span>
            </div>
            
            <h2 
              className={`text-6xl md:text-8xl font-black uppercase whitespace-pre-wrap transition-all duration-300 text-${alignment} text-center`}
              style={getNeonStyle()}
            >
              {text || "YOUR TEXT"}
            </h2>

            <div className="absolute -bottom-12 left-0 right-0 h-4 border-l-2 border-r-2 border-b-2 border-white/60 mt-4">
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white font-bold text-sm drop-shadow-md">
                {size === "Small" ? "60cm" : size === "Standard" ? "90cm" : "120cm"}
              </span>
            </div>
          </div>
        </div>

        {/* Background Selector Thumbnails */}
        <div className="absolute bottom-6 flex gap-3 z-20">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => {
                setSelectedBg(bg.value);
                setIsTransparentBg(false);
              }}
              className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shadow-md ${selectedBg === bg.value && !isTransparentBg ? 'border-[#00BFFF] scale-110' : 'border-white/20 hover:border-white/50'}`}
              title={bg.label}
            >
              {bg.value.startsWith('/') ? (
                <Image src={bg.value} alt={bg.label} fill className="object-cover" sizes="56px" />
              ) : (
                <div className="w-full h-full" style={{ backgroundColor: bg.value }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- RIGHT PANEL --- */}
      <div className="w-full lg:w-[450px] bg-white dark:bg-[#1a1c23] rounded-xl shadow-xl flex flex-col border border-gray-200 dark:border-zinc-800 flex-shrink-0 h-[800px] overflow-hidden">
        
        {/* Conditional Rendering: Edit Mode vs Summary Mode */}
        {!showSummary ? (
          
          /* 1. EDIT MODE CONTROLS */
          <div className="p-8 flex flex-col h-full overflow-y-auto custom-scrollbar animate-in slide-in-from-left-8 fade-in duration-300">
            <h1 className="text-2xl font-bold mb-6 font-serif dark:text-white sticky top-0 bg-white dark:bg-[#1a1c23] z-10 py-2 border-b border-gray-100 dark:border-zinc-800">
              CREATE YOUR SIGN
            </h1>

            <div className="mb-6">
              <label className="block font-bold mb-1 dark:text-white">Write your text</label>
              <p className="text-xs text-gray-500 mb-2">1/2Lines, 10max characters per line</p>
              <div className="border border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden focus-within:border-[#00BFFF] focus-within:ring-1 focus-within:ring-[#00BFFF] transition-all">
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-4 bg-transparent outline-none resize-none h-24 dark:text-white font-medium"
                  placeholder="Your Text"
                />
                <div className="flex gap-2 p-3 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
                  <button onClick={() => setAlignment("left")} className={`p-2 rounded ${alignment === 'left' ? 'text-[#00BFFF] bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}><AlignLeft size={20}/></button>
                  <button onClick={() => setAlignment("center")} className={`p-2 rounded ${alignment === 'center' ? 'text-[#00BFFF] bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}><AlignCenter size={20}/></button>
                  <button onClick={() => setAlignment("right")} className={`p-2 rounded ${alignment === 'right' ? 'text-[#00BFFF] bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400'}`}><AlignRight size={20}/></button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-3 dark:text-white">Fonts</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Classic", value: "Inter, sans-serif" },
                  { name: "Cursive", value: "'Brush Script MT', cursive" },
                  { name: "Block", value: "Impact, sans-serif" },
                  { name: "Striped", value: "'Monoton', cursive" }
                ].map((f) => (
                  <button 
                    key={f.name}
                    onClick={() => setFontFamily(f.value)}
                    className={`py-2 px-3 rounded-md text-sm transition-all border ${fontFamily === f.value ? 'bg-[#00BFFF] text-white border-[#00BFFF]' : 'bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 dark:text-gray-300 hover:border-[#00BFFF]'}`}
                    style={{ fontFamily: f.value }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-3 dark:text-white">Tube Style</label>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
                <button onClick={() => setFontType("Outline")} className={`flex-1 py-3 text-sm font-bold transition-all ${fontType === 'Outline' ? 'bg-[#00BFFF] text-white' : 'bg-gray-50 dark:bg-zinc-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}>OUTLINE</button>
                <button onClick={() => setFontType("Solid")} className={`flex-1 py-3 text-sm font-bold transition-all ${fontType === 'Solid' ? 'bg-[#00BFFF] text-white' : 'bg-gray-50 dark:bg-zinc-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}>SOLID</button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-3 dark:text-white">Size</label>
              <div className="grid grid-cols-1 gap-3">
                {["Small", "Standard", "Medium"].map((s) => (
                  <div 
                    key={s}
                    onClick={() => setSize(s)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${size === s ? 'border-[#00BFFF] bg-blue-50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-zinc-700 hover:border-[#00BFFF]'}`}
                  >
                    <p className="font-bold text-sm dark:text-white mb-1">{s}</p>
                    <p className={`text-xs ${size === s ? 'text-[#00BFFF]' : 'text-gray-500'}`}>
                      maximum {s === 'Small' ? '60cm (2ft)' : s === 'Standard' ? '90cm (3ft)' : '120cm (4ft)'} in length
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-bold mb-3 dark:text-white">Colors</label>
              <div className="flex flex-wrap gap-3">
                {["#FFA500", "#FF1493", "#00FFFF", "#39FF14", "#FFFFFF", "#FF0000", "#9400D3", "#8A2BE2", "#1E90FF"].map((c) => (
                  <button 
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-md border-2 transition-transform ${color === c ? 'scale-110 border-gray-900 dark:border-white shadow-lg' : 'border-gray-200 dark:border-zinc-700'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-bold mb-3 dark:text-white">Backboards</label>
              <div className="flex flex-col gap-3">
                <div onClick={() => setBacking("Cut To Shape")} className={`p-4 rounded-lg border cursor-pointer transition-all ${backing === 'Cut To Shape' ? 'border-[#00BFFF] bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-zinc-700 hover:border-[#00BFFF]'}`}>
                  <p className="font-bold text-sm dark:text-white">Cut To Shape (FREE)</p>
                  <p className={`text-xs mt-1 ${backing === 'Cut To Shape' ? 'text-[#00BFFF]' : 'text-gray-500'}`}>Acrylic backboard follows the shape of your sign as outline</p>
                </div>
                <div onClick={() => setBacking("Cut To Letter")} className={`p-4 rounded-lg border cursor-pointer transition-all ${backing === 'Cut To Letter' ? 'border-[#00BFFF] bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-300 dark:border-zinc-700 hover:border-[#00BFFF]'}`}>
                  <p className="font-bold text-sm dark:text-white">Cut To Letter (+7.5%)</p>
                  <p className={`text-xs mt-1 ${backing === 'Cut To Letter' ? 'text-[#00BFFF]' : 'text-gray-500'}`}>Cuts are more discrete but only suited for cursive fonts of size less than 45 inches</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-bold mb-1 dark:text-white">Add an icon</label>
              <p className="text-xs text-gray-500 mb-3">Add selected icon to your text sign</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setSelectedIcon("none")} className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 transition-all ${selectedIcon === 'none' ? 'border-[#00BFFF]' : 'border-gray-300 dark:border-zinc-700'}`}>
                  <span className="text-xs text-gray-400">None</span>
                </button>
                {[
                  { name: "Crown", icon: Crown },
                  { name: "Heart", icon: Heart },
                  { name: "Star", icon: Star },
                  { name: "Zap", icon: Zap },
                  { name: "Flame", icon: Flame }
                ].map((iconObj) => (
                  <button key={iconObj.name} onClick={() => setSelectedIcon(iconObj.name)} className={`w-14 h-14 rounded-lg bg-black flex items-center justify-center border-2 transition-all ${selectedIcon === iconObj.name ? 'border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.5)]' : 'border-transparent'}`}>
                    <iconObj.icon size={28} color={selectedIcon === iconObj.name ? color : "#666"} style={selectedIcon === iconObj.name ? { filter: `drop-shadow(0 0 8px ${color})` } : {}} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 relative">
              <label className="block font-bold mb-3 dark:text-white">Plug type</label>
              <button 
                onClick={() => setIsPlugDropdownOpen(!isPlugDropdownOpen)}
                className="w-full p-4 border border-gray-300 dark:border-zinc-700 rounded-lg bg-transparent dark:text-white outline-none flex justify-between items-center hover:border-[#00BFFF] dark:hover:border-[#00BFFF] transition-all"
              >
                <span className="font-medium">{plugType}</span>
                <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isPlugDropdownOpen ? 'rotate-180 text-[#00BFFF]' : ''}`} />
              </button>
              {isPlugDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {["USA/CAN", "UK", "EU", "AU/NZ"].map((plug) => (
                    <div
                      key={plug}
                      onClick={() => {
                        setPlugType(plug);
                        setIsPlugDropdownOpen(false);
                      }}
                      className={`p-4 cursor-pointer font-medium transition-colors ${
                        plugType === plug 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-[#00BFFF]' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {plug}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setShowSummary(true)} className="w-full py-4 mt-auto bg-[#00BFFF] hover:bg-blue-400 text-white font-black text-xl rounded-lg transition-all shadow-lg hover:shadow-blue-500/50">
              FINISH
            </button>
          </div>

        ) : (

          /* 2. SUMMARY MODE */
          <div className="p-8 flex flex-col h-full overflow-y-auto custom-scrollbar animate-in slide-in-from-right-8 fade-in duration-300 bg-gray-50 dark:bg-zinc-900/50">
            
            <div className="flex items-center gap-4 mb-8 sticky top-0 bg-gray-50 dark:bg-zinc-900/50 z-10 py-2 border-b border-gray-200 dark:border-zinc-800">
              <button onClick={() => setShowSummary(false)} className="p-2 bg-white dark:bg-zinc-800 rounded-full border border-gray-200 dark:border-zinc-700 hover:text-[#00BFFF] transition-colors shadow-sm">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold font-serif dark:text-white">
                ORDER SUMMARY
              </h1>
            </div>

            <div className="space-y-6 flex-grow bg-white dark:bg-[#1a1c23] p-6 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
              <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-zinc-700 pb-3">
                <span className="text-gray-500 dark:text-gray-400">Custom Text</span>
                <span className="font-bold dark:text-white text-right max-w-[200px] truncate">"{text}"</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-zinc-700 pb-3">
                <span className="text-gray-500 dark:text-gray-400">Size</span>
                <span className="font-bold dark:text-white">{size}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-zinc-700 pb-3">
                <span className="text-gray-500 dark:text-gray-400">Color</span>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color }} />
                  <span className="font-bold dark:text-white uppercase">{color}</span>
                </div>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-zinc-700 pb-3">
                <span className="text-gray-500 dark:text-gray-400">Backboard</span>
                <span className="font-bold dark:text-white">{backing}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-zinc-700 pb-3">
                <span className="text-gray-500 dark:text-gray-400">Added Icon</span>
                <span className="font-bold dark:text-white">{selectedIcon}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-gray-200 dark:border-zinc-700 pb-3">
                <span className="text-gray-500 dark:text-gray-400">Plug</span>
                <span className="font-bold dark:text-white">{plugType}</span>
              </div>
              
              <div className="pt-6 flex justify-between items-end">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Total Estimate</span>
                <span className="text-4xl font-black text-[#00BFFF]">${getPrice().toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <button 
  onClick={() => {
    addToCart({
      name: "Custom Neon Sign",
      price: getPrice(),
      details: `Text: "${text}" | Size: ${size} | Color: ${color} | Backing: ${backing}`
    });
    setShowSummary(false); // Close summary screen
  }}
  className="w-full py-4 font-black text-xl rounded-lg bg-[#00BFFF] text-white hover:bg-blue-400 shadow-lg hover:shadow-[#00BFFF]/50 transition-all"
>
  ADD TO CART
</button>
              <button onClick={() => setShowSummary(false)} className="w-full py-4 font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-zinc-800 rounded-lg border-2 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
                EDIT DESIGN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}