import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private antDesignIcons = [
    // Directional Icons
    'step-backward-ant', 'step-forward-ant', 'fast-backward-ant', 'fast-forward-ant', 'shrink-ant', 'arrows-alt-ant',
    'down-ant', 'up-ant', 'left-ant', 'right-ant', 'caret-up-ant', 'caret-down-ant', 'caret-left-ant', 'caret-right-ant',
    'up-circle-ant', 'down-circle-ant', 'left-circle-ant', 'right-circle-ant', 'double-right-ant', 'double-left-ant',
    'vertical-left-ant', 'vertical-right-ant', 'forward-ant', 'backward-ant', 'rollback-ant', 'enter-ant', 'retweet-ant',
    'swap-ant', 'swap-left-ant', 'swap-right-ant', 'arrow-up-ant', 'arrow-down-ant', 'arrow-left-ant', 'arrow-right-ant',
    'play-circle-ant', 'up-square-ant', 'down-square-ant', 'left-square-ant', 'right-square-ant', 'login-ant',
    'logout-ant', 'menu-fold-ant', 'menu-unfold-ant',

    // Suggested Icons
    'question-ant', 'question-circle-ant', 'plus-ant', 'plus-circle-ant', 'pause-ant', 'pause-circle-ant',
    'minus-ant', 'minus-circle-ant', 'plus-square-ant', 'minus-square-ant', 'info-ant', 'info-circle-ant',
    'exclamation-ant', 'exclamation-circle-ant', 'close-ant', 'close-circle-ant', 'close-square-ant',
    'check-ant', 'check-circle-ant', 'check-square-ant', 'clock-circle-ant', 'warning-ant',
    'stop-ant',

    // Editor Icons
    'edit-ant', 'form-ant', 'copy-ant', 'scissor-ant', 'delete-ant', 'snippets-ant', 'diff-ant', 'highlight-ant',
    'align-center-ant', 'align-left-ant', 'align-right-ant', 'bg-colors-ant', 'bold-ant', 'italic-ant',
    'underline-ant', 'strikethrough-ant', 'redo-ant', 'undo-ant', 'zoom-in-ant', 'zoom-out-ant', 'font-colors-ant',
    'font-size-ant', 'line-height-ant', 'dash-ant', 'small-dash-ant', 'sort-ascending-ant', 'sort-descending-ant',
    'drag-ant', 'ordered-list-ant', 'unordered-list-ant',

    // Data Icons
    'area-chart-ant', 'pie-chart-ant', 'bar-chart-ant', 'dot-chart-ant', 'line-chart-ant', 'radar-chart-ant',
    'heat-map-ant', 'fall-ant', 'rise-ant', 'stock-ant', 'box-plot-ant', 'fund-ant', 'sliders-ant',

    // Brand and Logos
    'android-ant', 'apple-ant', 'windows-ant', 'ie-ant', 'chrome-ant', 'github-ant', 'aliwangwang-ant', 'dingding-ant',
    'weibo-square-ant', 'weibo-circle-ant', 'taobao-ant', 'html5-ant', 'weibo-ant', 'twitter-ant', 'wechat-ant',
    'youtube-ant', 'alipay-circle-ant', 'taobao-circle-ant', 'weibo-square-ant',

    // Application Icons
    'account-book-ant', 'aim-ant', 'alert-ant', 'apartment-ant', 'api-ant', 'appstore-ant', 'audio-ant', 'audit-ant',
    'bank-ant', 'barcode-ant', 'bars-ant', 'bell-ant', 'block-ant', 'book-ant', 'border-ant', 'branches-ant',
    'build-ant', 'bulb-ant', 'calculator-ant', 'calendar-ant', 'camera-ant', 'car-ant', 'carry-out-ant', 'cloud-ant',
    'code-ant', 'compass-ant', 'contacts-ant', 'container-ant', 'control-ant', 'credit-card-ant', 'crown-ant',
    'customer-service-ant', 'dashboard-ant', 'database-ant', 'dislike-ant', 'environment-ant', 'experiment-ant',
    'eye-ant', 'eye-invisible-ant', 'file-ant', 'file-add-ant', 'file-excel-ant', 'file-image-ant',
    'file-pdf-ant', 'file-text-ant', 'file-word-ant', 'file-zip-ant', 'filter-ant', 'fire-ant', 'flag-ant',
    'folder-ant', 'folder-add-ant', 'folder-open-ant', 'frown-ant', 'funnel-plot-ant', 'gift-ant', 'hdd-ant',
    'heart-ant', 'home-ant', 'hourglass-ant', 'idcard-ant', 'insurance-ant', 'interaction-ant', 'layout-ant',
    'like-ant', 'lock-ant', 'mail-ant', 'medicine-box-ant', 'meh-ant', 'message-ant', 'mobile-ant', 'money-collect-ant',
    'notification-ant', 'paper-clip-ant', 'phone-ant', 'picture-ant', 'play-square-ant', 'printer-ant',
    'profile-ant', 'project-ant', 'property-safety-ant', 'pushpin-ant', 'qrcode-ant', 'read-ant', 'reconciliation-ant',
    'red-envelope-ant', 'rest-ant', 'rocket-ant', 'safety-certificate-ant', 'save-ant', 'schedule-ant',
    'security-scan-ant', 'setting-ant', 'shop-ant', 'shopping-ant', 'skin-ant', 'smile-ant', 'sound-ant', 'star-ant',
    'switcher-ant', 'tablet-ant', 'tag-ant', 'tags-ant', 'tool-ant', 'thunderbolt-ant', 'trophy-ant',
    'unlock-ant', 'usb-ant', 'video-camera-ant', 'wallet-ant'
  ];

  private materialIcons = [
    // Action Icons
    'home-mat', 'settings-mat', 'account_circle-mat', 'search-mat', 'favorite-mat', 'shopping_cart-mat',
    'visibility-mat', 'visibility_off-mat', 'lock-mat', 'lock_open-mat', 'help-mat', 'info-mat', 'warning-mat',
    'error-mat', 'add-mat', 'edit-mat', 'delete-mat', 'share-mat', 'menu-mat', 'close-mat', 'check-mat', 'more_vert-mat',
    'more_horiz-mat', 'refresh-mat', 'done-mat', 'cancel-mat', 'bookmark-mat', 'bookmark_border-mat',

    // Navigation Icons
    'arrow_back-mat', 'arrow_forward-mat', 'arrow_upward-mat', 'arrow_downward-mat', 'menu_open-mat',
    'expand_less-mat', 'expand_more-mat', 'first_page-mat', 'last_page-mat', 'fullscreen-mat', 'fullscreen_exit-mat',

    // Communication Icons
    'email-mat', 'message-mat', 'phone-mat', 'chat-mat', 'chat_bubble-mat', 'chat_bubble_outline-mat',
    'notifications-mat', 'notifications_none-mat', 'notifications_active-mat',

    // Content Icons
    'add_box-mat', 'add_circle-mat', 'add_circle_outline-mat', 'block-mat', 'clear-mat', 'create-mat',
    'filter_list-mat', 'flag-mat', 'font_download-mat', 'forward-mat', 'gesture-mat', 'inbox-mat',
    'link-mat', 'low_priority-mat', 'next_week-mat', 'outlined_flag-mat', 'redo-mat', 'remove-mat',
    'remove_circle-mat', 'remove_circle_outline-mat', 'reply-mat', 'reply_all-mat', 'report-mat',
    'save-mat', 'select_all-mat', 'send-mat', 'sort-mat', 'text_format-mat', 'unarchive-mat', 'undo-mat',
    'weekend-mat',

    // File Icons
    'attachment-mat', 'cloud-mat', 'cloud_circle-mat', 'cloud_done-mat', 'cloud_download-mat',
    'cloud_off-mat', 'cloud_queue-mat', 'cloud_upload-mat', 'create_new_folder-mat', 'folder-mat',
    'folder_open-mat', 'folder_shared-mat',

    // Hardware Icons
    'cast-mat', 'cast_connected-mat', 'computer-mat', 'desktop_mac-mat', 'desktop_windows-mat',
    'developer_board-mat', 'device_hub-mat', 'devices_other-mat', 'dock-mat', 'gamepad-mat',
    'headset-mat', 'headset_mic-mat', 'keyboard-mat', 'keyboard_arrow_down-mat',
    'keyboard_arrow_left-mat', 'keyboard_arrow_right-mat', 'keyboard_arrow_up-mat',
    'keyboard_backspace-mat', 'keyboard_capslock-mat', 'keyboard_hide-mat', 'keyboard_return-mat',
    'keyboard_tab-mat', 'keyboard_voice-mat', 'laptop-mat', 'laptop_chromebook-mat',
    'laptop_mac-mat', 'laptop_windows-mat', 'memory-mat', 'mouse-mat', 'phone_android-mat',
    'phone_iphone-mat', 'phonelink-mat', 'phonelink_off-mat', 'power_input-mat', 'router-mat',
    'scanner-mat', 'security-mat', 'sim_card-mat', 'smartphone-mat', 'speaker-mat', 'speaker_group-mat',
    'tablet-mat', 'tablet_android-mat', 'tablet_mac-mat', 'toys-mat', 'tv-mat', 'videogame_asset-mat',
    'watch-mat',

    // Image Icons
    'add_a_photo-mat', 'add_photo_alternate-mat', 'add_to_photos-mat', 'adjust-mat', 'assistant-mat',
    'assistant_photo-mat', 'audiotrack-mat', 'blur_circular-mat', 'blur_linear-mat', 'blur_off-mat',
    'blur_on-mat', 'brightness_1-mat', 'brightness_2-mat', 'brightness_3-mat', 'brightness_4-mat',
    'brightness_5-mat', 'brightness_6-mat', 'brightness_7-mat', 'broken_image-mat', 'brush-mat',
    'burst_mode-mat', 'camera-mat', 'camera_alt-mat', 'camera_front-mat', 'camera_rear-mat',
    'camera_roll-mat', 'center_focus_strong-mat', 'center_focus_weak-mat', 'collections-mat',
    'collections_bookmark-mat', 'color_lens-mat', 'colorize-mat', 'compare-mat', 'control_point-mat',
    'control_point_duplicate-mat', 'crop-mat', 'crop_16_9-mat', 'crop_3_2-mat', 'crop_5_4-mat',
    'crop_7_5-mat', 'crop_din-mat', 'crop_free-mat', 'crop_landscape-mat', 'crop_original-mat',
    'crop_portrait-mat', 'crop_rotate-mat', 'crop_square-mat',

    // Alert Icons
    'add_alert-mat', 'error_outline-mat', 'error-mat', 'warning-mat', 'notification_important-mat',

    // AV Icons
    'play_arrow-mat', 'pause-mat', 'stop-mat', 'fast_forward-mat', 'fast_rewind-mat', 'skip_next-mat',
    'skip_previous-mat', 'playlist_add-mat', 'queue_music-mat', 'recent_actors-mat',

    // Social Icons
    'group-mat', 'group_add-mat', 'person-mat', 'person_add-mat', 'person_outline-mat',
    'plus_one-mat', 'poll-mat', 'public-mat', 'school-mat', 'sentiment_dissatisfied-mat',
    'sentiment_satisfied-mat', 'sentiment_very_satisfied-mat', 'share-mat', 'thumb_down_alt-mat',
    'thumb_up_alt-mat', 'whatshot-mat',

    // Places Icons
    'ac_unit-mat', 'airport_shuttle-mat', 'all_inclusive-mat', 'beach_access-mat', 'business_center-mat',
    'casino-mat', 'child_care-mat', 'child_friendly-mat', 'fitness_center-mat', 'free_breakfast-mat',
    'golf_course-mat', 'hot_tub-mat', 'kitchen-mat', 'meeting_room-mat', 'no_meeting_room-mat',
    'pool-mat', 'room_service-mat', 'rv_hookup-mat', 'smoke_free-mat', 'smoking_rooms-mat', 'spa-mat'
  ];

  constructor() {}

  getAllIcons(): string[] {
    return [...this.antDesignIcons, ...this.materialIcons];
  }

  getAntDesignIcons(): string[] {
    return [...this.antDesignIcons];
  }

  getMaterialIcons(): string[] {
    return [...this.materialIcons];
  }

  isAntDesignIcon(icon: string): boolean {
    return icon.endsWith('-ant');
  }

  isMaterialIcon(icon: string): boolean {
    return icon.endsWith('-mat');
  }

  getIconType(icon: string): { type: string; isMaterial: boolean } {
    const isMaterial = this.isMaterialIcon(icon);
    return {
      type: isMaterial ? icon.replace('-mat', '') : icon.replace('-ant', ''),
      isMaterial
    };
  }
}
