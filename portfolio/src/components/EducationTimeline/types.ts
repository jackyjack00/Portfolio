export interface EducationItem {
  range: string;
  title: string;
  school: string;
  details: string;
  extra: string;
}

export interface ToggleableCardProps {
  item: EducationItem;
  index: number;
  openIndex: number | null;
  onToggle: (index: number) => void;
}
