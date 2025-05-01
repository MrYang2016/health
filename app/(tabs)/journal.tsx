import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, CirclePlus as PlusCircle, CreditCard as Edit, Trash2 } from 'lucide-react-native';

export default function JournalScreen() {
  const [entries, setEntries] = useState([
    {
      id: '1',
      date: 'May 15, 2025',
      title: 'Feeling stronger today',
      content: 'Completed my full workout routine without feeling fatigued. I think the new diet plan is working well. Energy levels are much higher than last week.',
      mood: 'great',
    },
    {
      id: '2',
      date: 'May 14, 2025',
      title: 'Struggled with diet adherence',
      content: 'Had a difficult day sticking to my meal plan. Went out for lunch with colleagues and had limited healthy options. Need to plan better for these situations.',
      mood: 'okay',
    },
    {
      id: '3',
      date: 'May 13, 2025',
      title: 'New personal record',
      content: 'Set a new personal record on my 5k run today! Finished in 22:30, which is 45 seconds faster than my previous best. The interval training seems to be paying off.',
      mood: 'great',
    },
  ]);
  
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  
  const addEntry = () => {
    if (newEntryTitle.trim() === '' || newEntryContent.trim() === '') {
      return;
    }
    
    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    
    const newEntry = {
      id: Date.now().toString(),
      date: formattedDate,
      title: newEntryTitle,
      content: newEntryContent,
      mood: selectedMood || 'okay',
    };
    
    setEntries([newEntry, ...entries]);
    setIsAddingEntry(false);
    setNewEntryTitle('');
    setNewEntryContent('');
    setSelectedMood('');
  };
  
  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };
  
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great':
        return '#27AE60';
      case 'okay':
        return '#F39C12';
      case 'bad':
        return '#E53E3E';
      default:
        return '#8E8E93';
    }
  };
  
  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'great':
        return '😀';
      case 'okay':
        return '😐';
      case 'bad':
        return '😞';
      default:
        return '🙂';
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Journal</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setIsAddingEntry(!isAddingEntry)}
        >
          {isAddingEntry ? (
            <Text style={styles.addButtonText}>Cancel</Text>
          ) : (
            <>
              <PlusCircle size={20} color="#4A90E2" />
              <Text style={styles.addButtonText}>New Entry</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.container}>
        {isAddingEntry && (
          <View style={styles.addEntryContainer}>
            <Text style={styles.addEntryTitle}>New Journal Entry</Text>
            
            <TextInput
              style={styles.titleInput}
              value={newEntryTitle}
              onChangeText={setNewEntryTitle}
              placeholder="Entry title"
              placeholderTextColor="#8E8E93"
            />
            
            <TextInput
              style={styles.contentInput}
              value={newEntryContent}
              onChangeText={setNewEntryContent}
              placeholder="How are you feeling today? What went well? What could be improved?"
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            
            <Text style={styles.moodLabel}>How did you feel today?</Text>
            <View style={styles.moodSelector}>
              <TouchableOpacity 
                style={[
                  styles.moodButton, 
                  selectedMood === 'great' && styles.selectedMoodButton
                ]}
                onPress={() => setSelectedMood('great')}
              >
                <Text style={styles.moodEmoji}>😀</Text>
                <Text style={styles.moodText}>Great</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.moodButton, 
                  selectedMood === 'okay' && styles.selectedMoodButton
                ]}
                onPress={() => setSelectedMood('okay')}
              >
                <Text style={styles.moodEmoji}>😐</Text>
                <Text style={styles.moodText}>Okay</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.moodButton, 
                  selectedMood === 'bad' && styles.selectedMoodButton
                ]}
                onPress={() => setSelectedMood('bad')}
              >
                <Text style={styles.moodEmoji}>😞</Text>
                <Text style={styles.moodText}>Bad</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={addEntry}
            >
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {entries.map(entry => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <View style={styles.entryDateContainer}>
                <Calendar size={16} color="#8E8E93" />
                <Text style={styles.entryDate}>{entry.date}</Text>
              </View>
              <View style={styles.entryActions}>
                <TouchableOpacity style={styles.entryAction}>
                  <Edit size={16} color="#4A90E2" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.entryAction}
                  onPress={() => deleteEntry(entry.id)}
                >
                  <Trash2 size={16} color="#E53E3E" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.entryContent}>
              <View style={styles.entryTitleContainer}>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(entry.mood) }]}>
                  <Text>{getMoodEmoji(entry.mood)}</Text>
                </View>
              </View>
              <Text style={styles.entryText}>{entry.content}</Text>
            </View>
          </View>
        ))}
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#4A90E2',
    fontWeight: '500',
    marginLeft: 6,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  addEntryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addEntryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  titleInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#1F2937',
  },
  contentInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    height: 120,
    color: '#1F2937',
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodButton: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  selectedMoodButton: {
    backgroundColor: '#EBF5FF',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodText: {
    fontSize: 14,
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  entryDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  entryActions: {
    flexDirection: 'row',
  },
  entryAction: {
    padding: 4,
    marginLeft: 12,
  },
  entryContent: {
    padding: 16,
  },
  entryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  moodIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  entryText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
});