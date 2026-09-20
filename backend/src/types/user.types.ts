type StoredUser = 
      {
        id: number;
        email: string;
        created_at: Date;
        password_hash: string;
        role: 'user' | 'admin';
      };

type PublicUser = Omit<StoredUser, 'password_hash'>;
type LoginResult = {
  user: PublicUser;
  sessionToken: string;
};

export type { StoredUser, PublicUser, LoginResult };