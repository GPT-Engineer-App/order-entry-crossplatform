import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Container, Text, VStack, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, IconButton, Box, HStack, Badge } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import { FaShoppingCart, FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import About from "./About";

// Create a context for user authentication and order management
const AuthContext = createContext();
const OrderContext = createContext();

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <OrderProvider>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/sales" element={<SalesDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </OrderProvider>
      </AuthProvider>
    </Router>
  );
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const login = (username, password) => {
    if (username === "admin" && password === "123") {
      setUser({ username, role: "admin" });
      navigate("/admin");
    } else if (username === "Sales" && password === "123") {
      setUser({ username, role: "sales" });
      navigate("/sales");
    } else if (username !== "admin" && password === "password") {
      setUser({ username, role: "sales" });
      navigate("/sales");
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch products and accounts from the ERP system
    fetchProducts();
    fetchAccounts();
  }, []);

  const fetchProducts = async () => {
    // Fetch products from ERP API
    // For now, we'll use dummy data
    setProducts([
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
    ]);
  };

  const fetchAccounts = async () => {
    // Fetch accounts from ERP API
    // For now, we'll use dummy data
    setAccounts([
      { id: 1, name: "Account 1" },
      { id: 2, name: "Account 2" },
    ]);
  };

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status } : order)));
  };

  return <OrderContext.Provider value={{ orders, products, accounts, addOrder, updateOrderStatus }}>{children}</OrderContext.Provider>;
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Container centerContent maxW={["container.sm", "container.md"]} height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize={["xl", "2xl"]}>Order Entry Application</Text>
        <Text>Redirecting...</Text>
      </VStack>
    </Container>
  );
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <Container centerContent maxW={["container.sm", "container.md"]} height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize={["xl", "2xl"]}>Login</Text>
        <Text>Enter "admin" as username for admin access. Use any other username for sales access.</Text>
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Login</Button>
      </VStack>
    </Container>
  );
};

const AdminDashboard = () => {
  const { orders, updateOrderStatus } = useContext(OrderContext);
  const { logout } = useContext(AuthContext);

  return (
    <Container maxW={["container.sm", "container.md", "container.lg"]}>
      <HStack justifyContent="space-between" my={4}>
        <Text fontSize={["xl", "2xl"]}>Admin Dashboard</Text>
        <Button onClick={logout}>Logout</Button>
      </HStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Account</Th>
            <Th>Products</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.account.name}</Td>
              <Td>
                {order.products.map((product) => (
                  <Box key={product.id}>
                    {product.name} - {product.quantity}
                  </Box>
                ))}
              </Td>
              <Td>
                <Badge colorScheme={getStatusColor(order.status)}>{order.status}</Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton aria-label="Approve" icon={<FaCheck />} onClick={() => updateOrderStatus(order.id, "Approved")} />
                  <IconButton aria-label="Request Revision" icon={<FaEdit />} onClick={() => updateOrderStatus(order.id, "Pending Revision")} />
                  <IconButton aria-label="Reject" icon={<FaTimes />} onClick={() => updateOrderStatus(order.id, "Rejected")} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

const SalesDashboard = () => {
  const { orders, products, accounts, addOrder } = useContext(OrderContext);
  const { user, logout } = useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, quantity) => {
    setCart([...cart, { ...product, quantity }]);
  };

  const handleSubmitOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      account: accounts.find((account) => account.id === parseInt(selectedAccount)),
      products: cart,
      status: "Sent",
      user: user.username,
    };
    addOrder(newOrder);
    setCart([]);
  };

  return (
    <Container maxW={["container.sm", "container.md", "container.lg"]}>
      <HStack justifyContent="space-between" my={4}>
        <Text fontSize={["xl", "2xl"]}>Sales Dashboard</Text>
        <Button onClick={logout}>Logout</Button>
      </HStack>
      <VStack spacing={4}>
        <Select placeholder="Select Account" value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </Select>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>
                  <Input type="number" min="1" defaultValue="1" id={`quantity-${product.id}`} />
                </Td>
                <Td>
                  <Button onClick={() => handleAddToCart(product, document.getElementById(`quantity-${product.id}`).value)}>Add to Cart</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button leftIcon={<FaShoppingCart />} colorScheme="teal" onClick={handleSubmitOrder}>
          Submit Order
        </Button>
        <Text fontSize="xl">Order History</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Account</Th>
              <Th>Products</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders
              .filter((order) => order.user === user.username)
              .map((order) => (
                <Tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{order.account.name}</Td>
                  <Td>
                    {order.products.map((product) => (
                      <Box key={product.id}>
                        {product.name} - {product.quantity}
                      </Box>
                    ))}
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(order.status)}>{order.status}</Badge>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Sent":
      return "blue";
    case "Approved":
      return "green";
    case "Completed":
      return "purple";
    case "Pending Revision":
      return "orange";
    case "Rejected":
      return "red";
    default:
      return "gray";
  }
};

export default App;
