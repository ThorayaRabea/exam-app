export const USER_KEYS = {
  all: ["users"] as const,

  profile: () => [...USER_KEYS.all, "profile"] as const,
} as const;