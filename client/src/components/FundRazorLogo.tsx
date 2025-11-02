interface FundRazorLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function FundRazorLogo({ 
  width = 200, 
  height = 57,
  className = ""
}: FundRazorLogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 280 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Text */}
      <text
        x="10"
        y="52"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="32"
        fontWeight="700"
        className="fill-foreground"
        letterSpacing="-0.02em"
      >
        Fund<tspan className="fill-primary">Razor</tspan>
      </text>
      
      {/* Slash accent (upward direction) */}
      <line 
        x1="130" 
        y1="62" 
        x2="150" 
        y2="18" 
        className="stroke-primary"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line 
        x1="132" 
        y1="62" 
        x2="152" 
        y2="18" 
        className="stroke-primary"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
