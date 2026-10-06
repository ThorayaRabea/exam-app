export type IRole=(typeof ROLES)[keyof typeof ROLES]
export interface IAuditLog{
        id: string,
        createdAt: string,
        actorUserId: string,
        actorUsername: string,
        actorEmail: string,
        actorRole:IRole,
        category: string,
        action: string,
        entityType: string,
        entityId: string,
        metadata: {
          keys: string[],
          title: string
        },
        ipAddress: string,
        userAgent: string,
        httpMethod: string,
        path: string
      
}