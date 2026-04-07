import { ICON_MAP, type IconName } from '../../model/iconMap';

type Props = {
  name?: IconName;
};

export const CategoryIcon = ({ name }: Props) => {
    if (!name) return null;
  const Icon = ICON_MAP[name];

  return Icon ? <Icon /> : null;
};