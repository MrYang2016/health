import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CirclePlus as PlusCircle, CircleCheck as CheckCircle, Camera, Upload, ChartBar as BarChart3 } from 'lucide-react-native';

export default function TrackScreen() {
  const [mealTracking, setMealTracking] = useState({
    breakfast: false,
    morningSnack: false,
    lunch: false,
    afternoonSnack: false,
    dinner: false,
  });
  
  const [exerciseTracking, setExerciseTracking] = useState({
    cardio: false,
    strength: false,
  });
  
  const toggleMeal = (meal: keyof typeof mealTracking) => {
    setMealTracking({
      ...mealTracking,
      [meal]: !mealTracking[meal],
    });
  };
  
  const toggleExercise = (exercise: keyof typeof exerciseTracking) => {
    setExerciseTracking({
      ...exerciseTracking,
      [exercise]: !exerciseTracking[exercise],
    });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Progress</Text>
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.progressSummary}>
          <Text style={styles.summaryHeader}>Today's Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${60}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>60% Complete</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diet Tracking</Text>
          
          <View style={styles.trackCard}>
            <View style={styles.trackHeader}>
              <Text style={styles.trackTitle}>Breakfast</Text>
              <Text style={styles.trackTime}>7:30 AM</Text>
            </View>
            
            <View style={styles.trackContent}>
              <Text style={styles.trackDescription}>Greek Yogurt Bowl</Text>
              
              <View style={styles.actionButtons}>
                {!mealTracking.breakfast ? (
                  <>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => toggleMeal('breakfast')}
                    >
                      <CheckCircle size={20} color="#27AE60" />
                      <Text style={styles.actionText}>Complete</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <Camera size={20} color="#4A90E2" />
                      <Text style={styles.actionText}>Photo</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <PlusCircle size={20} color="#F39C12" />
                      <Text style={styles.actionText}>Substitute</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.completedView}>
                    <CheckCircle size={20} color="#27AE60" />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          
          <View style={styles.trackCard}>
            <View style={styles.trackHeader}>
              <Text style={styles.trackTitle}>Morning Snack</Text>
              <Text style={styles.trackTime}>10:30 AM</Text>
            </View>
            
            <View style={styles.trackContent}>
              <Text style={styles.trackDescription}>Apple with Almond Butter</Text>
              
              <View style={styles.actionButtons}>
                {!mealTracking.morningSnack ? (
                  <>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => toggleMeal('morningSnack')}
                    >
                      <CheckCircle size={20} color="#27AE60" />
                      <Text style={styles.actionText}>Complete</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <Camera size={20} color="#4A90E2" />
                      <Text style={styles.actionText}>Photo</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <PlusCircle size={20} color="#F39C12" />
                      <Text style={styles.actionText}>Substitute</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.completedView}>
                    <CheckCircle size={20} color="#27AE60" />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          
          <View style={styles.trackCard}>
            <View style={styles.trackHeader}>
              <Text style={styles.trackTitle}>Lunch</Text>
              <Text style={styles.trackTime}>1:00 PM</Text>
            </View>
            
            <View style={styles.trackContent}>
              <Text style={styles.trackDescription}>Grilled Chicken Salad</Text>
              
              <View style={styles.actionButtons}>
                {!mealTracking.lunch ? (
                  <>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => toggleMeal('lunch')}
                    >
                      <CheckCircle size={20} color="#27AE60" />
                      <Text style={styles.actionText}>Complete</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <Camera size={20} color="#4A90E2" />
                      <Text style={styles.actionText}>Photo</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <PlusCircle size={20} color="#F39C12" />
                      <Text style={styles.actionText}>Substitute</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.completedView}>
                    <CheckCircle size={20} color="#27AE60" />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercise Tracking</Text>
          
          <View style={styles.trackCard}>
            <View style={styles.trackHeader}>
              <Text style={styles.trackTitle}>Morning Cardio</Text>
              <Text style={styles.trackTime}>30 min</Text>
            </View>
            
            <View style={styles.trackContent}>
              <Text style={styles.trackDescription}>Moderate intensity jogging or cycling</Text>
              
              <View style={styles.actionButtons}>
                {!exerciseTracking.cardio ? (
                  <>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => toggleExercise('cardio')}
                    >
                      <CheckCircle size={20} color="#27AE60" />
                      <Text style={styles.actionText}>Complete</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <Upload size={20} color="#4A90E2" />
                      <Text style={styles.actionText}>Log Stats</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <BarChart3 size={20} color="#F39C12" />
                      <Text style={styles.actionText}>Adjust</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.completedView}>
                    <CheckCircle size={20} color="#27AE60" />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          
          <View style={styles.trackCard}>
            <View style={styles.trackHeader}>
              <Text style={styles.trackTitle}>Evening Strength Training</Text>
              <Text style={styles.trackTime}>40 min</Text>
            </View>
            
            <View style={styles.trackContent}>
              <Text style={styles.trackDescription}>Squats, Push-ups, Dumbbell Rows, Plank</Text>
              
              <View style={styles.actionButtons}>
                {!exerciseTracking.strength ? (
                  <>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => toggleExercise('strength')}
                    >
                      <CheckCircle size={20} color="#27AE60" />
                      <Text style={styles.actionText}>Complete</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <Upload size={20} color="#4A90E2" />
                      <Text style={styles.actionText}>Log Stats</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionButton}>
                      <BarChart3 size={20} color="#F39C12" />
                      <Text style={styles.actionText}>Adjust</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View style={styles.completedView}>
                    <CheckCircle size={20} color="#27AE60" />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Health Report</Text>
          
          <TouchableOpacity style={styles.uploadCard}>
            <View style={styles.uploadIcon}>
              <Upload size={32} color="#4A90E2" />
            </View>
            <Text style={styles.uploadText}>Upload your medical report</Text>
            <Text style={styles.uploadDescription}>
              We'll analyze your data and update your plans accordingly
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  progressSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'right',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  trackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  trackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  trackTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  trackContent: {
    marginTop: 4,
  },
  trackDescription: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 6,
  },
  completedView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  completedText: {
    fontSize: 14,
    color: '#27AE60',
    marginLeft: 6,
    fontWeight: '500',
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});