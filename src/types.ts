export interface RSSFeed {
    name: string;
    url: string;
    category: string;
    last_fetched: Date;
  }
  
  export interface SubscriptionTier {
    features: string[];
    price: number | string;
    name: string;
  }
  
  export interface AdminUser {
    username: string;
    password_hash: string;
    last_login: Date;
    role: string;
  }
  
  export interface ArticleTag {
    tag_id: string;
    article_id: string;
  }
  
  export interface Article {
    title: string;
    url: string;
    source: string;
    summary: string;
    content: string;
    eli5: string;
    tags: string[];
    historical_context: string;
    topic_category: string;
    region: string;
    language: string;
    published_at: Date;
    counterpoints: string;
  }

  export interface ArticleWithBias {
    id: string;
    title: string;
    url: string;
    source: string;
    summary: string;
    content: string;
    eli5: string;
    tags: string[];
    historical_context: string;
    topic_category: string;
    region: string;
    language: string;
    published_at: Date;
    counterpoints: string;
    bias_score: number;
  }
  
  export interface BlindSpotArticles {
    id: string;
    title: string;
    url: string;
    source: string;
    summary: string;
    content: string;
    eli5: string;
    tags: string[];
    historical_context: string;
    topic_category: string;
    region: string;
    language: string;
    published_at: Date;
    counterpoints: string;
    bias_score: number;
    explanation: string;
  }
  export interface BiasAnalysis {
    article_id: string;
    bias_label: string;
    bias_score: number;
    ai_confidence: number;
    analyzed_at: Date;
  }
  
  export interface Bookmark {
    user_id: string;
    article_id: string;
    bookmarked_at: Date;
  }
  
  export interface Device {
    device_token: string;
    user_id: string;
    device_type: string;
    last_active: Date;
  }
  
  export interface FactCheck {
    claim: string;
    verdict: string;
    explanation: string;
    evidence: string;
  }
  
  export interface Feedback {
    user_id: string;
    article_id: string;
    user_name: string;
    comment: string;
    created_at: Date;
    type: string;
  }
  
  export interface FeedbackFlag {
    article_id: string;
    user_id: string;
    issue_type: string;
    description: string;
    created_at: Date;
  }
  
  export interface PollResponse {
    user_id: string;
    poll_id: string;
    responded_at: Date;
    selected_option: string;
  }
  
  export interface Poll {
    question: string;
    options: string;
    is_active: boolean;
    created_at: Date;
  }
  
  export interface PushNotification {
    user_id: string;
    message: string;
    sent_at: Date;
    read: boolean;
  }
  
  export interface SentimentTrend {
    article_id: string;
    sentiment: string;
    sentiment_score: number;
    trend_timestamp: Date;
  }
  
  export interface SocialMediaTrend {
    keyword: string;
    platform: string;
    mentions_count: number;
    sentiment_score: number;
    captured_at: Date;
  }
  
  export interface Subscription {
    user_id: string;
    plan_name: string;
    start_date: Date;
    end_date: Date;
    auto_renew: boolean;
  }
  
  export interface Tag {
    tag_name: string;
  }
  
  export interface TrendingArticle {
    article_id: string;
    region: string;
    trending_score: number;
    captured_at: Date;
  }
  
  export interface UserActivityLog {
    user_id: string;
    article_id: string;
    action: string;
    timestamp: Date;
  }
  
  export interface UserPreferences {
    user_id: string;
    preferred_topics: string;
    preferred_bias: string;
    preferred_region: string;
  }
  
  export interface User {
    name: string;
    email: string;
    password: string;
    country: string;
    interests: string[];
    customInterest: string;
    newsHabits: string;
    socialMediaUsage: string;
    responses: Record<string, any>;
  }
  