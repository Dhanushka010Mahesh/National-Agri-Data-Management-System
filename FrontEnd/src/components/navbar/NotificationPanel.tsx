
import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { getMockNotificationsByUserId } from "@/services/mockData";

interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const notifications = user ? getMockNotificationsByUserId(user.id) : [];
  
  const handleNotificationClick = (link: string | undefined) => {
    if (link) {
      navigate(link);
      onClose();
    }
  };
  
  return (
    <div className="absolute top-16 right-0 mt-1 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="max-h-80">
        {notifications.length > 0 ? (
          <div className="py-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-primary-light/10' : ''}`}
                onClick={() => handleNotificationClick(notification.link)}
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
                {!notification.isRead && (
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-1"></span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationPanel;
