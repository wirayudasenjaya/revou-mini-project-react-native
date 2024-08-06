export type FeedProps = {
  data: PostProps[];
  loading: boolean;
  navigation: any;
  refreshing: boolean;
  onRefresh: any;
  onEndReach: any;
  logout?: any;
};

export type TopicProps = {
  id: string;
  file?: {
    name_display: string;
    full_path: string;
    size: number;
    mime_type: string;
  };
  label: string;
};

export type PostProps = {
  id: string;
  header: string;
  content: string;
  attachments: null;
  attachment_properties: null;
  repost_post_id: null;
  created_at: string;
  is_upvoted: boolean;
  is_downvoted: boolean;
  is_reposted: boolean;
  is_question_post: boolean;
  is_owned: boolean;
  total_comments: number;
  upvotes: number;
  reposts: number;
  post_type: string;
  time: string;
  topic?: {
    id: string;
    label: string;
  };
  analysis: null;
  parent_post: null;
  user?: {
    user_id: string;
    name: string;
    username: string;
    profile_path: string;
    profile_image_properties: null;
    bio: string;
    is_pro: boolean;
    is_premium: boolean;
    is_verified: boolean;
    created_at: string;
    total_followers: number;
    total_following: number;
    is_followed: boolean;
    pro_profile: null;
    calendly_url: null;
    favorite_topics: null;
    referral_code: null;
    headline: string;
    favorite_instruments: null;
  };
  poll_questions: null;
};

export type InputStateProps =
  | 'disabled'
  | 'default'
  | 'positive'
  | 'negative'
  | 'focused'
  | 'default-no-label';

export type RegisterDataProps = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  username: string;
}

export type RegisterComponentProps = {
  registerData: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    username: string;
  };
  errorMessage: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    username: string;
  };
  handleInputChange: (key: string, value: string) => void;
  handleInputBlur: (key: string) => void;
  inputStates: Record<string, InputStateProps>;
};

export type SelectTopicsProps = {
  topic: TopicProps[];
  selectedTopic: string[];
  handleSelectedTopic: ({id, label}: TopicProps) => void;
};

export type StackParams = {
  Onboarding: undefined;
  Home: {login: string};
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  HomeTabs: undefined;
  Create: undefined;
  Detail: {id: number};
};

export type AuthState = {
  isLoggedIn: boolean;
};

export type AuthAction = {type: 'LOGIN', payload: string} | {type: 'LOGOUT'};
