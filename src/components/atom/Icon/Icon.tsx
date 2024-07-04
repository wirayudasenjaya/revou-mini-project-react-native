type IconName = 'arrow-circle-left' | 'check' | 'eye';

type IconProps = {
  name: IconName;
  fill?: string;
  width?: number;
  height?: number;
};

const IconMap: Record<
  IconName,
  React.FC<{width?: number; height?: number; fill?: string}>
> = {
  'arrow-circle-left': require('./ArrowCircleLeft').default,
  check: require('./Check').default,
  eye: require('./Eye').default,
};

export default function Icon({name, ...props}: IconProps) {
  const IconComponent = IconMap[name];

  return <IconComponent {...props} />;
}
