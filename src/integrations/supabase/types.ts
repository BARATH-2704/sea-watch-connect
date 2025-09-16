export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alert_subscriptions: {
        Row: {
          active: boolean | null
          created_at: string | null
          hazard_types: string[] | null
          id: string
          latitude: number
          location_name: string | null
          longitude: number
          notification_methods: Json | null
          radius_km: number | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          hazard_types?: string[] | null
          id?: string
          latitude: number
          location_name?: string | null
          longitude: number
          notification_methods?: Json | null
          radius_km?: number | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          hazard_types?: string[] | null
          id?: string
          latitude?: number
          location_name?: string | null
          longitude?: number
          notification_methods?: Json | null
          radius_km?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hazards: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          description: string | null
          details: Json | null
          hazard_type: string
          id: string
          latitude: number
          location_name: string | null
          longitude: number
          media_url: string | null
          original_language: string | null
          source: string | null
          source_details: Json | null
          status: string | null
          translated_description: string | null
          updated_at: string | null
          urgency_level: string | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          description?: string | null
          details?: Json | null
          hazard_type: string
          id?: string
          latitude: number
          location_name?: string | null
          longitude: number
          media_url?: string | null
          original_language?: string | null
          source?: string | null
          source_details?: Json | null
          status?: string | null
          translated_description?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          description?: string | null
          details?: Json | null
          hazard_type?: string
          id?: string
          latitude?: number
          location_name?: string | null
          longitude?: number
          media_url?: string | null
          original_language?: string | null
          source?: string | null
          source_details?: Json | null
          status?: string | null
          translated_description?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hazards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          preferred_language: string | null
          reports_count: number | null
          role: string
          theme: string | null
          trust_score: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id: string
          preferred_language?: string | null
          reports_count?: number | null
          role?: string
          theme?: string | null
          trust_score?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          preferred_language?: string | null
          reports_count?: number | null
          role?: string
          theme?: string | null
          trust_score?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      radio_transmissions: {
        Row: {
          audio_url: string
          confidence: number | null
          created_at: string | null
          emergency_keywords: string[] | null
          hazard_type: string | null
          id: string
          latitude: number | null
          longitude: number | null
          original_language: string | null
          processed_at: string | null
          processed_by: string | null
          status: string | null
          transcribed_text: string | null
          translated_text: string | null
        }
        Insert: {
          audio_url: string
          confidence?: number | null
          created_at?: string | null
          emergency_keywords?: string[] | null
          hazard_type?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          original_language?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string | null
          transcribed_text?: string | null
          translated_text?: string | null
        }
        Update: {
          audio_url?: string
          confidence?: number | null
          created_at?: string | null
          emergency_keywords?: string[] | null
          hazard_type?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          original_language?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string | null
          transcribed_text?: string | null
          translated_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "radio_transmissions_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
