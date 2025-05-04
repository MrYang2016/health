import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Platform, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Upload, Settings, ChevronRight, ShieldCheck, LogOut, CircleHelp as HelpCircle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    // 初始默认值
    const defaultData = {
      name: '',
      email: '',
      height: '165',
      weight: '62',
      birthday: '05/14/1990',
      gender: 'Female',
      goals: 'Weight management, Increase energy',
      allergies: 'Peanuts, Shellfish',
      medicalConditions: 'None',
    };
    
    // 尝试从AsyncStorage获取用户信息
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setProfileData({
            ...defaultData,
            name: parsedUser.fullName?.givenName && parsedUser.fullName?.familyName ? 
                  `${parsedUser.fullName.givenName} ${parsedUser.fullName.familyName}` : 
                  'User',
            email: parsedUser.email || '',
          });
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };
    
    loadUserData();
    return defaultData;
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    mealReminders: true,
    workoutReminders: true,
    progressUpdates: true,
    tips: false,
  });
  
  const [tempProfileData, setTempProfileData] = useState({...profileData});
  
  const startEditing = () => {
    setTempProfileData({...profileData});
    setIsEditing(true);
  };
  
  const cancelEditing = () => {
    setIsEditing(false);
  };
  
  const saveProfile = () => {
    setProfileData({...tempProfileData});
    setIsEditing(false);
  };
  
  const handleProfileChange = (field: string, value: string) => {
    setTempProfileData({
      ...tempProfileData,
      [field]: value,
    });
  };
  
  const toggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };
  
  const uploadMedicalReport = () => {
    Alert.alert(
      "Upload Medical Report",
      "This feature would allow you to upload your medical report for AI analysis."
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        {!isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={startEditing}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEditing}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg' }}
              style={styles.avatar}
            />
            {isEditing && (
              <TouchableOpacity style={styles.avatarEditButton}>
                <Text style={styles.avatarEditText}>Change</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {isEditing ? (
            <TextInput
              style={styles.nameInputField}
              value={tempProfileData.name}
              onChangeText={(value) => handleProfileChange('name', value)}
              placeholder="Your name"
            />
          ) : (
            <Text style={styles.profileName}>{profileData.name}</Text>
          )}
          
          <Text style={styles.profileEmail}>{profileData.email}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Height (cm)</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={tempProfileData.height}
                  onChangeText={(value) => handleProfileChange('height', value)}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.height}</Text>
              )}
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weight (kg)</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={tempProfileData.weight}
                  onChangeText={(value) => handleProfileChange('weight', value)}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.weight}</Text>
              )}
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Birthday</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={tempProfileData.birthday}
                  onChangeText={(value) => handleProfileChange('birthday', value)}
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.birthday}</Text>
              )}
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Gender</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={tempProfileData.gender}
                  onChangeText={(value) => handleProfileChange('gender', value)}
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.gender}</Text>
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Goals</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={tempProfileData.goals}
                  onChangeText={(value) => handleProfileChange('goals', value)}
                  multiline
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.goals}</Text>
              )}
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Allergies</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={tempProfileData.allergies}
                  onChangeText={(value) => handleProfileChange('allergies', value)}
                  multiline
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.allergies}</Text>
              )}
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Medical Conditions</Text>
              {isEditing ? (
                <TextInput
                  style={styles.inputField}
                  value={tempProfileData.medicalConditions}
                  onChangeText={(value) => handleProfileChange('medicalConditions', value)}
                  multiline
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.medicalConditions}</Text>
              )}
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={uploadMedicalReport}
          >
            <Upload size={20} color="#4A90E2" />
            <Text style={styles.uploadButtonText}>Upload Medical Report</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Meal Reminders</Text>
              <Switch
                value={notificationSettings.mealReminders}
                onValueChange={() => toggleNotification('mealReminders')}
                trackColor={{ false: '#D1D5DB', true: '#4A90E2' }}
                thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : notificationSettings.mealReminders ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
            
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Workout Reminders</Text>
              <Switch
                value={notificationSettings.workoutReminders}
                onValueChange={() => toggleNotification('workoutReminders')}
                trackColor={{ false: '#D1D5DB', true: '#4A90E2' }}
                thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : notificationSettings.workoutReminders ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
            
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Progress Updates</Text>
              <Switch
                value={notificationSettings.progressUpdates}
                onValueChange={() => toggleNotification('progressUpdates')}
                trackColor={{ false: '#D1D5DB', true: '#4A90E2' }}
                thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : notificationSettings.progressUpdates ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
            
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Nutrition & Fitness Tips</Text>
              <Switch
                value={notificationSettings.tips}
                onValueChange={() => toggleNotification('tips')}
                trackColor={{ false: '#D1D5DB', true: '#4A90E2' }}
                thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : notificationSettings.tips ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Settings size={20} color="#4B5563" />
                <Text style={styles.menuItemText}>Account Settings</Text>
              </View>
              <ChevronRight size={20} color="#8E8E93" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <ShieldCheck size={20} color="#4B5563" />
                <Text style={styles.menuItemText}>Privacy & Security</Text>
              </View>
              <ChevronRight size={20} color="#8E8E93" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <HelpCircle size={20} color="#4B5563" />
                <Text style={styles.menuItemText}>Help & Support</Text>
              </View>
              <ChevronRight size={20} color="#8E8E93" />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
              <View style={styles.menuItemLeft}>
                <LogOut size={20} color="#E53E3E" />
                <Text style={[styles.menuItemText, styles.logoutText]}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  editButton: {
    backgroundColor: '#EBF5FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  editActions: {
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A90E2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  avatarEditText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  nameInputField: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
    paddingBottom: 4,
    width: '80%',
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  inputField: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: '#4A90E2',
    paddingVertical: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF5FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  uploadButtonText: {
    color: '#4A90E2',
    fontWeight: '500',
    marginLeft: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  toggleLabel: {
    fontSize: 16,
    color: '#1F2937',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#E53E3E',
  },
});