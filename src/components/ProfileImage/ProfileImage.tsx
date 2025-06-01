import { useEffect, useState } from 'react';
import { Avatar } from 'antd'; 

import ProfileImageProp from './ProfileImageProp';

function ProfileImage({ 
    imageUrl, 
    username = 'awu0626',
    width,
}: ProfileImageProp) {
    const [profileData, setProfileData] = useState<{
        avatar_url: string,
        bio: string,
        name: string,
        followers: string,
        login: string
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = imageUrl || `https://api.github.com/users/${username}`;
                const response = await fetch(url);
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchData();
    }, [imageUrl, username]);

    return (
        <div style={{ 
            textAlign: 'center',
            marginTop: '25px',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <Avatar 
            src={profileData?.avatar_url} 
            size={width > 200 ? 128 : 100} 
        />
            <div style={{
                color: '#cccccc',
                marginTop: '2.5vh',
                marginBottom: '2.5vh',
                textAlign: 'center',
            }}>
                {profileData?.login || username}
            </div>
        </div>
    );
}

export default ProfileImage;