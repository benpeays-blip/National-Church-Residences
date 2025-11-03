/**
 * FundRazor Logo Component
 * 
 * A clean, production-ready React component for the FundRazor logo.
 * Features ice blue accent color with upward slash direction.
 * 
 * Usage:
 * import { FundRazorLogo } from './FundRazorLogo';
 * 
 * <FundRazorLogo />
 * <FundRazorLogo width={400} />
 * <FundRazorLogo variant="light" />
 */

interface FundRazorLogoProps {
  width?: number;
  height?: number;
  variant?: "dark" | "light";
  className?: string;
}

export function FundRazorLogo({ 
  width = 280, 
  height = 80,
  variant = "dark",
  className = ""
}: FundRazorLogoProps) {
  
  const colors = variant === "dark" 
    ? {
        primary: "#ffffff",
        accent: "#7dd3fc"
      }
    : {
        primary: "#0f172a",
        accent: "#0284c7"
      };

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
        fill={colors.primary}
        letterSpacing="-0.02em"
      >
        Fund<tspan fill={colors.accent}>Razor</tspan>
      </text>
      
      {/* Slash accent (upward direction) */}
      <line 
        x1="130" 
        y1="62" 
        x2="150" 
        y2="18" 
        stroke={colors.accent} 
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line 
        x1="132" 
        y1="62" 
        x2="152" 
        y2="18" 
        stroke={colors.accent} 
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}