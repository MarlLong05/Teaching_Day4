// APP TỔNG HỢP — Giờ 4 + Giờ 5
// Home (Header + Chips + Grid + FloatingCartButton) và BookDetail (Giờ 4)
// hoạt động chung với TabBar + CartScreen (Giờ 5), chuyển màn bằng useState.
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { TabBar, TabKey } from './components/TabBar';
import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  // Xem chi tiết sách chiếm toàn màn hình, ẩn TabBar (giống app thật: vào
  // trang chi tiết sẽ tạm ẩn thanh điều hướng dưới, có nút back riêng).
  if (selectedBook) {
    return (
      <SafeAreaView style={styles.root}>
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={() => setCartCount((n) => n + 1)}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {activeTab === 'home' && (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => setActiveTab('cart')}
          />
        )}
        {activeTab === 'cart' && <CartScreen items={CART_ITEMS} />}
        {(activeTab === 'category' || activeTab === 'account') && (
          <Placeholder tab={activeTab} />
        )}

        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: '',
    category: 'Màn "Danh mục" chưa có trong bài (thuộc phần mở rộng ngoài Giờ 4 & Giờ 5).',
    cart: '',
    account: 'Tài liệu gốc không mô tả tab này, để trống.',
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1 },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  placeholderText: { textAlign: 'center', color: '#5B6B7F' },
});