type IconName =
  | 'arrow-circle-left'
  | 'check'
  | 'eye'
  | 'bell'
  | 'chevron-left'
  | 'question-circle'
  | 'plus'
  | 'user'
  | 'ellipsis'
  | 'arrow-up'
  | 'arrow-down'
  | 'comment'
  | 'retweet'
  | 'house'
  | 'paper-plane'
  | 'paperclip'
  | 'image';

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
  bell: require('./Bell').default,
  'chevron-left': require('./ChevronLeft').default,
  'question-circle': require('./QuestionCircle').default,
  plus: require('./Plus').default,
  user: require('./User').default,
  ellipsis: require('./Ellipsis').default,
  'arrow-up': require('./ArrowUp').default,
  'arrow-down': require('./ArrowDown').default,
  comment: require('./Comment').default,
  retweet: require('./Retweet').default,
  house: require('./House').default,
  'paper-plane': require('./PaperPlane').default,
  paperclip: require('./Paperclip').default,
  image: require('./Image').default,
};

export default function Icon({name, ...props}: IconProps) {
  const IconComponent = IconMap[name];

  return <IconComponent {...props} />;
}
