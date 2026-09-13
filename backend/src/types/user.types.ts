type StoredUser = 
      {
        id: number;
        email: string;
        created_at: Date;
        password_hash: string;
      };

type PublicUser = Omit<StoredUser, 'password_hash'>;

export type { StoredUser, PublicUser };