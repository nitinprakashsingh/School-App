import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { styles } from '../DashboardStyle';

interface EBooksProps {
  onClose?: () => void;
}

interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  class: string;
  pages: number;
  size: string;
  format: 'PDF' | 'EPUB';
  description: string;
  coverColor: string;
  downloadCount: number;
  rating: number;
}

const EBooksScreen: React.FC<EBooksProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const categories = ['All', 'Mathematics', 'Science', 'English', 'History', 'Geography', 'Hindi'];

  const books: Book[] = [
    {
      id: '1',
      title: 'Mathematics Textbook Class 10',
      author: 'NCERT',
      subject: 'Mathematics',
      class: 'Class 10',
      pages: 324,
      size: '15.2 MB',
      format: 'PDF',
      description: 'Complete NCERT Mathematics textbook for Class 10 with all chapters and exercises.',
      coverColor: '#FF6B6B',
      downloadCount: 1250,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Science Textbook Class 10',
      author: 'NCERT',
      subject: 'Science',
      class: 'Class 10',
      pages: 298,
      size: '18.7 MB',
      format: 'PDF',
      description: 'Comprehensive science textbook covering Physics, Chemistry, and Biology.',
      coverColor: '#4ECDC4',
      downloadCount: 980,
      rating: 4.7
    },
    {
      id: '3',
      title: 'First Flight - English Class 10',
      author: 'NCERT',
      subject: 'English',
      class: 'Class 10',
      pages: 256,
      size: '12.1 MB',
      format: 'PDF',
      description: 'English literature and language textbook with prose and poetry.',
      coverColor: '#45B7D1',
      downloadCount: 875,
      rating: 4.6
    },
    {
      id: '4',
      title: 'India and the Contemporary World',
      author: 'NCERT',
      subject: 'History',
      class: 'Class 10',
      pages: 189,
      size: '14.3 MB',
      format: 'PDF',
      description: 'History textbook covering modern Indian and world history.',
      coverColor: '#96CEB4',
      downloadCount: 654,
      rating: 4.5
    },
    {
      id: '5',
      title: 'Contemporary India Geography',
      author: 'NCERT',
      subject: 'Geography',
      class: 'Class 10',
      pages: 178,
      size: '16.8 MB',
      format: 'PDF',
      description: 'Geography textbook focusing on resources, agriculture, and development.',
      coverColor: '#FFEAA7',
      downloadCount: 743,
      rating: 4.4
    },
    {
      id: '6',
      title: 'Sparsh Hindi Textbook',
      author: 'NCERT',
      subject: 'Hindi',
      class: 'Class 10',
      pages: 234,
      size: '13.5 MB',
      format: 'PDF',
      description: 'Hindi literature textbook with stories, poems, and grammar.',
      coverColor: '#DDA0DD',
      downloadCount: 567,
      rating: 4.3
    },
    {
      id: '7',
      title: 'Mathematics Class 9',
      author: 'NCERT',
      subject: 'Mathematics',
      class: 'Class 9',
      pages: 312,
      size: '14.8 MB',
      format: 'PDF',
      description: 'Foundation mathematics textbook for Class 9 students.',
      coverColor: '#FF7675',
      downloadCount: 890,
      rating: 4.7
    },
    {
      id: '8',
      title: 'Science Class 9',
      author: 'NCERT',
      subject: 'Science',
      class: 'Class 9',
      pages: 289,
      size: '17.2 MB',
      format: 'PDF',
      description: 'Integrated science textbook for Class 9 covering all science subjects.',
      coverColor: '#74B9FF',
      downloadCount: 765,
      rating: 4.6
    },
    {
      id: '9',
      title: 'Beehive English Class 9',
      author: 'NCERT',
      subject: 'English',
      class: 'Class 9',
      pages: 201,
      size: '11.3 MB',
      format: 'PDF',
      description: 'English textbook with engaging stories and poems for Class 9.',
      coverColor: '#00B894',
      downloadCount: 698,
      rating: 4.5
    },
    {
      id: '10',
      title: 'Reference Book: Advanced Math',
      author: 'R.D. Sharma',
      subject: 'Mathematics',
      class: 'Class 10',
      pages: 456,
      size: '22.4 MB',
      format: 'PDF',
      description: 'Advanced mathematics reference book with solved examples and practice problems.',
      coverColor: '#E17055',
      downloadCount: 432,
      rating: 4.9
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.subject === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCategoryTab = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.secondaryButton,
        { 
          marginRight: 10,
          backgroundColor: selectedCategory === category ? '#4A90E2' : '#e9ecef',
          marginTop: 0,
          paddingHorizontal: 15,
        }
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.secondaryButtonText,
        { color: selectedCategory === category ? '#ffffff' : '#495057' }
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  const renderBook = (book: Book) => (
    <TouchableOpacity
      key={book.id}
      style={styles.listItem}
      onPress={() => setSelectedBook(book)}
    >
      <View style={{
        width: 50,
        height: 65,
        backgroundColor: book.coverColor,
        borderRadius: 6,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>📚</Text>
      </View>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{book.title}</Text>
        <Text style={styles.listItemSubtitle}>
          {book.author} • {book.class} • {book.pages} pages
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Text style={{ fontSize: 12, color: '#6c757d', marginRight: 10 }}>
            {renderStars(book.rating)} {book.rating}
          </Text>
          <Text style={{ fontSize: 12, color: '#6c757d' }}>
            {book.downloadCount} downloads
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <View style={{
            backgroundColor: book.format === 'PDF' ? '#dc3545' : '#28a745',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 10,
            marginRight: 6
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
              {book.format}
            </Text>
          </View>
          <View style={{
            backgroundColor: '#6c757d',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 10,
          }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
              {book.size}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.listItemAction}>
        <Text style={styles.listItemActionText}>Open</Text>
      </View>
    </TouchableOpacity>
  );

  const renderBookDetail = () => {
    if (!selectedBook) return null;

    return (
      <ScrollView style={styles.screenContent}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setSelectedBook(null)}
        >
          <Text style={styles.secondaryButtonText}>← Back to eBooks</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{
              width: 80,
              height: 100,
              backgroundColor: selectedBook.coverColor,
              borderRadius: 8,
              marginRight: 15,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>📚</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{selectedBook.title}</Text>
              <Text style={styles.cardContent}>
                Author: {selectedBook.author}{'\n'}
                Subject: {selectedBook.subject}{'\n'}
                Class: {selectedBook.class}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Text style={{ fontSize: 14, color: '#6c757d', marginRight: 15 }}>
                  {renderStars(selectedBook.rating)} {selectedBook.rating}
                </Text>
                <Text style={{ fontSize: 14, color: '#6c757d' }}>
                  {selectedBook.downloadCount} downloads
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Book Details</Text>
          <Text style={styles.cardContent}>{selectedBook.description}</Text>
          <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={[styles.cardContent, { fontWeight: '600' }]}>Pages:</Text>
              <Text style={styles.cardContent}>{selectedBook.pages}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={[styles.cardContent, { fontWeight: '600' }]}>File Size:</Text>
              <Text style={styles.cardContent}>{selectedBook.size}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={[styles.cardContent, { fontWeight: '600' }]}>Format:</Text>
              <Text style={styles.cardContent}>{selectedBook.format}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.cardContent, { fontWeight: '600' }]}>Downloads:</Text>
              <Text style={styles.cardContent}>{selectedBook.downloadCount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📱 Actions</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>📖 Read Online</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, { backgroundColor: '#28a745' }]}>
            <Text style={[styles.secondaryButtonText, { color: '#ffffff' }]}>⬇️ Download PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>🔖 Add to Bookmarks</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 Table of Contents</Text>
          <Text style={styles.cardContent}>
            {selectedBook.subject === 'Mathematics' ? (
              'Chapter 1: Real Numbers\nChapter 2: Polynomials\nChapter 3: Pair of Linear Equations\nChapter 4: Quadratic Equations\nChapter 5: Arithmetic Progressions\nChapter 6: Triangles\nChapter 7: Coordinate Geometry\nChapter 8: Introduction to Trigonometry\nChapter 9: Applications of Trigonometry\nChapter 10: Circles\nChapter 11: Areas Related to Circles\nChapter 12: Surface Areas and Volumes\nChapter 13: Statistics\nChapter 14: Probability'
            ) : selectedBook.subject === 'Science' ? (
              'Chapter 1: Light - Reflection and Refraction\nChapter 2: Human Eye and Colourful World\nChapter 3: Electricity\nChapter 4: Magnetic Effects of Electric Current\nChapter 5: Our Environment\nChapter 6: Life Processes\nChapter 7: Control and Coordination\nChapter 8: How do Organisms Reproduce?\nChapter 9: Heredity and Evolution\nChapter 10: Management of Natural Resources'
            ) : (
              'Complete table of contents available inside the book. Click "Read Online" to access detailed chapter listings and page numbers.'
            )}
          </Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.screenContainer}>

      {selectedBook ? (
        renderBookDetail()
      ) : (
        <ScrollView style={styles.screenContent}>
          {/* Search Bar */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🔍 Search Books</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#e9ecef',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginTop: 8,
                fontSize: 16
              }}
              placeholder="Search for textbooks, authors, subjects..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Category Tabs */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.cardTitle}>📂 Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {categories.map(renderCategoryTab)}
            </ScrollView>
          </View>

          {/* Stats */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Library Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{books.filter(b => b.format === 'PDF').length}</Text>
                <Text style={styles.statLabel}>PDFs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{books.filter(b => b.format === 'EPUB').length}</Text>
                <Text style={styles.statLabel}>EPUBs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{books.filter(b => b.author === 'NCERT').length}</Text>
                <Text style={styles.statLabel}>NCERT</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{books.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
            </View>
          </View>

          {/* Results */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              📚 {selectedCategory === 'All' ? 'All Books' : selectedCategory + ' Books'} 
              ({filteredBooks.length})
            </Text>
            {searchQuery ? (
              <Text style={styles.cardContent}>
                Showing results for "{searchQuery}"
              </Text>
            ) : null}
          </View>

          {/* Books List */}
          {filteredBooks.length > 0 ? (
            filteredBooks.map(renderBook)
          ) : (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>😔 No Books Found</Text>
              <Text style={styles.cardContent}>
                Try adjusting your search terms or selecting a different category.
              </Text>
            </View>
          )}

          {/* Reading Tips */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>💡 Reading Tips</Text>
            <Text style={styles.cardContent}>
              📖 Read in good lighting conditions{'\n'}
              ⏰ Take breaks every 30 minutes{'\n'}
              📝 Take notes while reading{'\n'}
              🔖 Use bookmarks to save your progress{'\n'}
              💾 Download books for offline reading{'\n'}
              🔍 Use search function to find specific topics
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default EBooksScreen;