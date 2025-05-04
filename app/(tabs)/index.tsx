import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LineChart } from './components/LineChart';
import { ProgressRing } from './components/ProgressRing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Utensils, Dumbbell, Award } from 'lucide-react-native';
import React from 'react';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.username}>Sarah</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg' }}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.summary}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <ProgressRing progress={0.75} size={60} strokeWidth={8} color="#4A90E2" />
              <View style={styles.summaryCardContent}>
                <Text style={styles.summaryCardValue}>75%</Text>
                <Text style={styles.summaryCardLabel}>Diet Plan</Text>
              </View>
            </View>
            <View style={styles.summaryCard}>
              <ProgressRing progress={0.6} size={60} strokeWidth={8} color="#27AE60" />
              <View style={styles.summaryCardContent}>
                <Text style={styles.summaryCardValue}>60%</Text>
                <Text style={styles.summaryCardLabel}>Exercise</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>
          <View style={styles.chartContainer}>
            <LineChart />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
          <View style={styles.planCards}>
            <TouchableOpacity style={styles.planCard}>
              <View style={styles.planCardIcon}>
                <Utensils size={24} color="#4A90E2" />
              </View>
              <View style={styles.planCardContent}>
                <Text style={styles.planCardTitle}>Diet Plan</Text>
                <Text style={styles.planCardDescription}>3 meals & 2 snacks planned</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.planCard}>
              <View style={styles.planCardIcon}>
                <Dumbbell size={24} color="#27AE60" />
              </View>
              <View style={styles.planCardContent}>
                <Text style={styles.planCardTitle}>Workout</Text>
                <Text style={styles.planCardDescription}>30 min cardio & 20 min strength</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
            <View style={styles.achievementCard}>
              <Award size={32} color="#F39C12" />
              <Text style={styles.achievementTitle}>Consistent</Text>
              <Text style={styles.achievementDescription}>7 days streak</Text>
            </View>
            <View style={styles.achievementCard}>
              <Award size={32} color="#9B59B6" />
              <Text style={styles.achievementTitle}>Early Bird</Text>
              <Text style={styles.achievementDescription}>5 morning workouts</Text>
            </View>
            <View style={styles.achievementCard}>
              <Award size={32} color="#27AE60" />
              <Text style={styles.achievementTitle}>Nutrition Pro</Text>
              <Text style={styles.achievementDescription}>Perfect macros 3 days</Text>
            </View>
          </ScrollView>
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  summary: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryCardContent: {
    marginLeft: 12,
  },
  summaryCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summaryCardLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  section: {
    marginBottom: 24,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    height: 200,
  },
  planCards: {
    gap: 12,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  planCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCardContent: {
    marginLeft: 16,
  },
  planCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  planCardDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  achievementsScroll: {
    marginTop: 8,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
    width: 130,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    textAlign: 'center',
  },
});