export interface Hero {
  name: string;
  roles: string[];
}

export interface HeroLink {
  href: string;
  label: string;
  svgIcon: React.FC<React.SVGProps<SVGSVGElement>>; // enriched ReactComponent for the SVG
}
