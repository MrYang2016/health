import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Utensils, Dumbbell } from 'lucide-react-native';

export default function PlansScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const getDayNumber = (date: Date) => {
    return date.getDate();
  };
  
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const generateWeekDays = () => {
    const days = [];
    const currentDate = new Date();
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
      days.push(date);
    }
    
    return days;
  };
  
  const weekDays = generateWeekDays();
  
  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(selectedDate.getDate() - 1);
    } else {
      newDate.setDate(selectedDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Plan</Text>
      </View>
      
      <View style={styles.calendarHeader}>
        <Text style={styles.currentDate}>{formatDate(selectedDate)}</Text>
        <View style={styles.calendarControls}>
          <TouchableOpacity 
            style={styles.calendarButton}
            onPress={() => navigateDay('prev')}
          >
            <ChevronLeft size={24} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.calendarIconButton}>
            <CalendarIcon size={20} color="#4A90E2" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.calendarButton}
            onPress={() => navigateDay('next')}
          >
            <ChevronRight size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.weekDays}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {weekDays.map((day, index) => {
            const isSelected = day.getDate() === selectedDate.getDate() && 
                            day.getMonth() === selectedDate.getMonth() &&
                            day.getFullYear() === selectedDate.getFullYear();
            
            return (
              <TouchableOpacity 
                key={index}
                style={[styles.dayButton, isSelected && styles.selectedDayButton]}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[styles.dayName, isSelected && styles.selectedDayText]}>
                  {getDayName(day)}
                </Text>
                <Text style={[styles.dayNumber, isSelected && styles.selectedDayText]}>
                  {getDayNumber(day)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconContainer}>
              <Utensils size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.sectionTitle}>Diet Plan</Text>
          </View>
          
          <View style={styles.mealContainer}>
            <Text style={styles.mealTime}>07:30 AM</Text>
            <View style={styles.mealCard}>
              <Text style={styles.mealTitle}>Breakfast</Text>
              <View style={styles.mealItem}>
                <Text style={styles.mealItemText}>Greek Yogurt Bowl</Text>
                <Text style={styles.mealItemDetails}>1 cup Greek yogurt, 1/4 cup granola, 1/2 cup berries, 1 tbsp honey</Text>
              </View>
              <View style={styles.nutritionInfo}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>380</Text>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>24g</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>45g</Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>12g</Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.mealContainer}>
            <Text style={styles.mealTime}>10:30 AM</Text>
            <View style={styles.mealCard}>
              <Text style={styles.mealTitle}>Morning Snack</Text>
              <View style={styles.mealItem}>
                <Text style={styles.mealItemText}>Apple with Almond Butter</Text>
                <Text style={styles.mealItemDetails}>1 medium apple, 1 tbsp almond butter</Text>
              </View>
              <View style={styles.nutritionInfo}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>170</Text>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>3g</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>25g</Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>8g</Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.mealContainer}>
            <Text style={styles.mealTime}>01:00 PM</Text>
            <View style={styles.mealCard}>
              <Text style={styles.mealTitle}>Lunch</Text>
              <View style={styles.mealItem}>
                <Text style={styles.mealItemText}>Grilled Chicken Salad</Text>
                <Text style={styles.mealItemDetails}>4 oz grilled chicken, 2 cups mixed greens, 1/4 cup cherry tomatoes, 1/4 avocado, 2 tbsp balsamic vinaigrette</Text>
              </View>
              <View style={styles.nutritionInfo}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>350</Text>
                  <Text style={styles.nutritionLabel}>Calories</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>30g</Text>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>15g</Text>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>20g</Text>
                  <Text style={styles.nutritionLabel}>Fat</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIconContainer, { backgroundColor: '#27AE60' }]}>
              <Dumbbell size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.sectionTitle}>Exercise Plan</Text>
          </View>
          
          <View style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <Text style={styles.workoutTitle}>Morning Cardio</Text>
              <Text style={styles.workoutDuration}>30 min</Text>
            </View>
            <Text style={styles.workoutDescription}>Moderate intensity jogging or cycling</Text>
            <View style={styles.workoutTarget}>
              <Text style={styles.workoutTargetText}>Target heart rate: 130-150 BPM</Text>
            </View>
          </View>
          
          <View style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <Text style={styles.workoutTitle}>Evening Strength Training</Text>
              <Text style={styles.workoutDuration}>40 min</Text>
            </View>
            <View style={styles.exerciseList}>
              <View style={styles.exercise}>
                <Text style={styles.exerciseName}>Squats</Text>
                <Text style={styles.exerciseDetails}>3 sets x 12 reps</Text>
              </View>
              <View style={styles.exercise}>
                <Text style={styles.exerciseName}>Push-ups</Text>
                <Text style={styles.exerciseDetails}>3 sets x 10 reps</Text>
              </View>
              <View style={styles.exercise}>
                <Text style={styles.exerciseName}>Dumbbell Rows</Text>
                <Text style={styles.exerciseDetails}>3 sets x 12 reps each arm</Text>
              </View>
              <View style={styles.exercise}>
                <Text style={styles.exerciseName}>Plank</Text>
                <Text style={styles.exerciseDetails}>3 sets x 45 seconds</Text>
              </View>
            </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  currentDate: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
  },
  calendarControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarButton: {
    padding: 8,
  },
  calendarIconButton: {
    padding: 8,
  },
  weekDays: {
    marginBottom: 20,
  },
  dayButton: {
    width: 60,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDayButton: {
    backgroundColor: '#4A90E2',
  },
  dayName: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  mealContainer: {
    marginBottom: 16,
  },
  mealTime: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  mealItem: {
    marginBottom: 12,
  },
  mealItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  mealItemDetails: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 16,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  workoutDuration: {
    fontSize: 16,
    color: '#27AE60',
    fontWeight: '500',
  },
  workoutDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  workoutTarget: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 8,
  },
  workoutTargetText: {
    fontSize: 14,
    color: '#27AE60',
  },
  exerciseList: {
    marginTop: 8,
  },
  exercise: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  exerciseName: {
    fontSize: 16,
    color: '#1F2937',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
});