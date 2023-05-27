/**
 * @typedef CacheOptions
 * @property {boolean} [guilds]
 * @property {boolean} [channels]
 * @property {boolean} [roles]
 */

export default class Cache {
    /**
     * @param {CacheOptions} options
     */
    constructor({guilds, channels, roles}) {
        this.options = {
            guilds: guilds !== true ? false : true,
            channels: channels !== true ? false : true,
            roles: roles !== true ? false : true
        }
        this.guilds = this.options.guilds === true ? new Map() : undefined;
    };

    /**
     * @param {unknown} data
     */
    handleGuildCreate(data) {
        if(this.client.cache.options.guilds !== true) return;
        const guild = {
            ...data,
            channels: this.client.cache.options.channels === true ? new Map(data.channels.map(e => [e.id === undefined ? e.user.id : e.id, e])) : undefined,
            roles: this.client.cache.options.roles === true ? new Map(data.roles.map(e => [e.id === undefined ? e.user.id : e.id, e])) : undefined,
        }
        delete guild["client"];
        delete guild["stickers"];
        delete guild["members"];
        delete guild["emojis"];
        this.client.cache.guilds.set(guild.id, guild);
    };

    /**
     * @param {unknown} data
     */
    handleGuildUpdate(data) {
        if(this.client.cache.options.guilds !== true) return;
        const guild = {
            ...this.client.cache.guilds.get(data.id),
            afk_channel_id: data.afk_channel_id,
            max_members: data.max_members,
            system_channel_id: data.system_channel_id,
            mfa_level: data.mfa_level,
            vanity_url_code: data.vanity_url_code,
            discovery_splash: data.discovery_splash,
            public_updates_channel_id: data.public_updates_channel_id,
            max_stage_video_channel_users: data.max_stage_video_channel_users,
            description: data.description,
            nsfw: data.nsfw,
            premium_tier: data.premium_tier,
            nsfw_level: data.nsfw_level,
            max_video_channel_users: data.max_video_channel_users,
            id: data.id,
            preferred_locale: data.preferred_locale,
            home_header: data.home_header,
            safety_alerts_channel_id: data.safety_alerts_channel_id,
            default_message_notifications: data.default_message_notifications,
            hub_type: data.hub_type,
            region: data.region,
            system_channel_flags: data.system_channel_flags,
            verification_level: data.verification_level,
            application_id: data.application_id,
            premium_progress_bar_enabled: data.premium_progress_bar_enabled,
            banner: data.banner,
            latest_onboarding_question_id: data.latest_onboarding_question_id,
            afk_timeout: data.afk_timeout,
            owner_id: data.owner_id,
            icon: data.icon,
            incidents_data: data.incidents_data,
            embedded_activities: data.embedded_activities,
            splash: data.splash,
            name: data.name,
            rules_channel_id: data.rules_channel_id,
            explicit_content_filter: data.explicit_content_filter,
            premium_subscription_count: data.premium_subscription_count,
            shardId: data.shardId
        }
        this.client.cache.guilds.set(guild.id, guild);
    };
    
    /**
     * @param {unknown} data
     */
    handleGuildDelete(data) {
        if(this.client.cache.options.guilds !== true) return;
        this.client.cache.guilds.delete(data.id);
    };

    /**
     * @param {unknown} data
     */
    handleChannelCreate(data) {
        if(this.client.cache.options.guilds !== true || this.client.cache.options.channels !== true) return;
        const channel = {    
            version: data.version,
            type: data.type,
            topic: data.topic,
            rate_limit_per_user: data.rate_limit_per_user,
            position: data.position,
            permission_overwrites: data.permission_overwrites,
            parent_id: data.parent_id,
            nsfw: data.nsfw,
            name: data.name,
            last_message_id: data.last_message_id,
            id: data.id,
            flags: data.flags
        };
        this.client.cache.guilds.get(data.guild_id).channels.set(channel.id, channel);
    };

    /**
     * @param {unknown} data
     */
    handleChannelUpdate(data) {
        if(this.client.cache.options.guilds !== true || this.client.cache.options.channels !== true) return;
        const channel = {    
            version: data.version,
            type: data.type,
            topic: data.topic,
            rate_limit_per_user: data.rate_limit_per_user,
            position: data.position,
            permission_overwrites: data.permission_overwrites,
            parent_id: data.parent_id,
            nsfw: data.nsfw,
            name: data.name,
            last_message_id: data.last_message_id,
            id: data.id,
            flags: data.flags
        };
        delete channel["client"];
        this.client.cache.guilds.get(data.guild_id).channels.set(channel.id, channel);
    };

    /**
     * @param {unknown} data
     */
    handleChannelDelete(data) {
        if(this.client.cache.options.guilds !== true || this.client.cache.options.channels !== true) return;
        this.client.cache.guilds.get(data.guild_id).channels.delete(data.id);
    };

    /**
     * @param {unknown} data
     */
    handleRoleCreate(data) {
        if(this.client.cache.options.guilds !== true || this.client.cache.options.roles !== true) return;
        const role = {
            version: data.role.version,
            unicode_emoji: data.role.unicode_emoji,
            tags: data.role.tags,
            position: data.role.position,
            permissions: data.role.permissions,
            name: data.role.name,
            mentionable: data.role.mentionable,
            managed: data.role.managed,
            id: data.role.id,
            icon: data.role.icon,
            hoist: data.role.hoist,
            flags: data.role.flags,
            color: data.role.color
        };
        this.client.cache.guilds.get(data.guild_id).roles.set(role.id, role);
    };

    /**
     * @param {unknown} data
     */
    handleRoleUpdate(data) {
        if(this.client.cache.options.guilds !== true || this.client.cache.options.roles !== true) return;
        const role = {
            version: data.role.version,
            unicode_emoji: data.role.unicode_emoji,
            tags: data.role.tags,
            position: data.role.position,
            permissions: data.role.permissions,
            name: data.role.name,
            mentionable: data.role.mentionable,
            managed: data.role.managed,
            id: data.role.id,
            icon: data.role.icon,
            hoist: data.role.hoist,
            flags: data.role.flags,
            color: data.role.color
        };
        this.client.cache.guilds.get(data.guild_id).roles.set(role.id, role);
    };
    
    /**
     * @param {unknown} data
     */
    handleRoleDelete(data) {
        if(this.client.cache.options.guilds !== true || this.client.cache.options.roles !== true) return;
        this.client.cache.guilds.get(data.guild_id).roles.delete(data.role_id);
    };
};
