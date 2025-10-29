import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { colors } from "../../theme/colors";
import { useAuth } from "../../context/AuthProvider";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) return alert("Please fill all fields");
    register(form.name, form.email, form.phone, form.password);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../../../assets/event-logo.png")} style={styles.logo} />
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Register to join the event</Text>

          <TextInput placeholder="Full Name" style={styles.input} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
          <TextInput placeholder="Email" style={styles.input} value={form.email} keyboardType="email-address" onChangeText={(v) => setForm({ ...form, email: v })} />
          <TextInput placeholder="Mobile Number" style={styles.input} value={form.phone} keyboardType="phone-pad" onChangeText={(v) => setForm({ ...form, phone: v })} />
          <TextInput placeholder="Password" style={styles.input} value={form.password} secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 14 }}>
            <Text style={{ color: "#555" }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 160,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  forgotText: {
    color: colors.accent,
    textAlign: "right",
    marginBottom: 10,
    fontWeight: "500",
  },
  linkText: {
    color: colors.primary,
    fontWeight: "600",
  },
});
