# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140930025042) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: true do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "events", force: true do |t|
    t.string   "name",                                 null: false
    t.datetime "date",                                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type",            default: "SubEvent"
    t.integer  "parent_event_id"
    t.boolean  "default",         default: false
  end

  add_index "events", ["parent_event_id"], name: "index_events_on_parent_event_id", using: :btree

  create_table "places", force: true do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.string   "address"
    t.float    "lat",         null: false
    t.float    "lng",         null: false
    t.integer  "user_id"
    t.integer  "route_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "places", ["route_id"], name: "index_places_on_route_id", using: :btree
  add_index "places", ["user_id"], name: "index_places_on_user_id", using: :btree

  create_table "route_segments", force: true do |t|
    t.integer "route_id",                      null: false
    t.string  "name"
    t.string  "coordinate_array", default: [], null: false, array: true
  end

  add_index "route_segments", ["route_id"], name: "index_route_segments_on_route_id", using: :btree

  create_table "routes", force: true do |t|
    t.integer  "user_id"
    t.string   "name",                          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "event_id",                      null: false
    t.boolean  "official",      default: false, null: false
    t.datetime "departs_at"
    t.string   "meeting_point"
    t.text     "description"
  end

  add_index "routes", ["event_id"], name: "index_routes_on_event_id", using: :btree
  add_index "routes", ["user_id"], name: "index_routes_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
