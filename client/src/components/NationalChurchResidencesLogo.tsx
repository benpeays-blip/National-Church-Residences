interface NationalChurchResidencesLogoProps {
  className?: string;
}

export function NationalChurchResidencesLogo({ className = "" }: NationalChurchResidencesLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-[120px] min-w-[120px]">
        <svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          {/* Left orange bar */}
          <polygon points="0,70 40,10 80,30 40,90" fill="#F7B04A" />
          {/* Red bar */}
          <polygon points="40,90 80,30 120,50 80,110" fill="#F27B7F" />
          {/* Blue bar */}
          <polygon points="80,110 120,50 160,70 120,130" fill="#8FD3EC" />
          {/* Green bar */}
          <polygon points="120,130 160,70 200,90 160,150" fill="#B9D869" />
        </svg>
      </div>
      <div className="text-[28px] leading-tight text-black font-sans">
        National Church Residences
      </div>
    </div>
  );
}
