import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type NewsFeedProps = {
  data: NewsProps[];
  loading: boolean;
  login: string | undefined;
  navigation: any;
  refreshing: boolean;
  onRefresh: any;
};

export type NewsProps = {
  avatar_url: string;
  name: string;
  headline: string;
  created_at: Date;
  post_header: string;
  post_content: string;
  post_topic: string;
  post_upvote: number;
  post_downvote: number;
  post_comment: number;
};

export type InputStateProps =
  | 'disabled'
  | 'default'
  | 'positive'
  | 'negative'
  | 'focused'
  | 'default-no-label';

export type StackParams = {
  Onboarding: undefined;
  Home: {login: string};
  Login: undefined;
  Profile: undefined;
  HomeTabs: undefined;
};
