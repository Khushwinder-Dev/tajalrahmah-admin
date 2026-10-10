// pages/Dashboard.tsx
import React from "react";
import {
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Progress,
  SimpleGrid,
  ThemeIcon,
  Stack,
  Table,
  ActionIcon,
  Avatar,
  Select,
  Button,
  RingProgress,
  Center,
  Alert,
} from "@mantine/core";
import {
  Users,
  Globe,
  Package,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  Edit,
  Download,
  Bell,
  DollarSign,
  UserCheck,
  Database,
  Languages,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  FolderTree,
  FileText,
  MessageSquareQuote,
  Briefcase,
  FolderKanban,
  SlidersHorizontal,
  HelpCircle,
  BellRing,
  Lightbulb,
  Building2,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Dummy data
const userGrowthData = [
  { month: "Jan", users: 1200, active: 950 },
  { month: "Feb", users: 1400, active: 1100 },
  { month: "Mar", users: 1600, active: 1300 },
  { month: "Apr", users: 1800, active: 1450 },
  { month: "May", users: 2100, active: 1700 },
  { month: "Jun", users: 2400, active: 1950 },
];

const moduleUsageData = [
  { name: "Countries", value: 850, color: "#3b82f6" },
  { name: "Users", value: 720, color: "#10b981" },
  { name: "Cities", value: 650, color: "#f59e0b" },
  { name: "States", value: 580, color: "#ef4444" },
  { name: "Companies", value: 420, color: "#8b5cf6" },
  { name: "Others", value: 300, color: "#6b7280" },
];

const revenueData = [
  { month: "Jan", revenue: 45000, target: 50000 },
  { month: "Feb", revenue: 52000, target: 55000 },
  { month: "Mar", revenue: 48000, target: 53000 },
  { month: "Apr", revenue: 61000, target: 58000 },
  { month: "May", revenue: 67000, target: 62000 },
  { month: "Jun", revenue: 73000, target: 68000 },
];

const languageStats = [
  { language: "English", users: 1450, percentage: 45.2, flag: "🇺🇸" },
  { language: "Arabic", users: 890, percentage: 27.8, flag: "🇸🇦" },
  { language: "Spanish", users: 520, percentage: 16.2, flag: "🇪🇸" },
  { language: "French", users: 280, percentage: 8.7, flag: "🇫🇷" },
  { language: "Others", users: 67, percentage: 2.1, flag: "🌍" },
];

const recentActivities = [
  {
    user: "John Doe",
    action: "Created new country",
    module: "Countries",
    time: "2 minutes ago",
    avatar: "JD",
  },
  {
    user: "Sarah Wilson",
    action: "Updated user profile",
    module: "Users",
    time: "5 minutes ago",
    avatar: "SW",
  },
  {
    user: "Mike Chen",
    action: "Added new city",
    module: "Cities",
    time: "12 minutes ago",
    avatar: "MC",
  },
  {
    user: "Emma Davis",
    action: "Generated report",
    module: "Reports",
    time: "18 minutes ago",
    avatar: "ED",
  },
  {
    user: "Alex Johnson",
    action: "Modified permissions",
    module: "Security",
    time: "25 minutes ago",
    avatar: "AJ",
  },
];

const systemAlerts = [
  {
    type: "warning",
    message: "Database backup overdue",
    time: "30 minutes ago",
  },
  {
    type: "info",
    message: "System maintenance scheduled for tonight",
    time: "2 hours ago",
  },
  {
    type: "success",
    message: "All services running normally",
    time: "4 hours ago",
  },
];

const statCards = [
  {
    title: "Total Post Categories",
    value: 5,
    icon: FolderTree,
  },
  {
    title: "Total Posts",
    value: 3,
    icon: FileText,
  },
  {
    title: "Total Testimonials",
    value: 4,
    icon: MessageSquareQuote,
  },
  {
    title: "Total Services",
    value: 6,
    icon: Briefcase,
  },
  {
    title: "Total Projects",
    value: 6,
    icon: FolderKanban,
  },
  {
    title: "Total Sliders",
    value: 4,
    icon: SlidersHorizontal,
  },
  {
    title: "Total FAQ",
    value: 5,
    icon: HelpCircle,
  },
  {
    title: "Total Subscribers",
    value: 3,
    icon: BellRing,
  },
  {
    title: "Total Solutions",
    value: 8,
    icon: Lightbulb,
  },
  {
    title: "Total Industries",
    value: 7,
    icon: Building2,
  },
  {
    title: "Total Clients",
    value: 5,
    icon: Users,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <Group justify="space-between" align="center">
          <div>
            <Text size="xl" fw={700} c="dark">
              Dashboard
            </Text>
          </div>
          <Group>
            <Select
              placeholder="Last 30 days"
              data={[
                "Last 7 days",
                "Last 30 days",
                "Last 90 days",
                "Last year",
              ]}
              defaultValue="Last 30 days"
              w={150}
            />
            <Button leftSection={<Download size={16} />} variant="light">
              Export
            </Button>
          </Group>
        </Group>
      </div>

      {/* Stats Cards Grid Matching Reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-100 dark:border-slate-700/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 flex items-center justify-between group"
            >
              <div>
                <p className="text-xs sm:text-[13px] font-semibold text-[#10b981] dark:text-[#34d399] tracking-wide mb-1.5">
                  {card.title}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
                  {card.value}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-300 group-hover:text-[#10b981] group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 transition-colors shrink-0">
                <IconComponent className="w-5 h-5 stroke-[1.8]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder radius="md" padding="lg" h={400}>
            <Group justify="space-between" mb="md">
              <Text fw={600} size="lg">
                User Growth Analytics
              </Text>
              <Badge color="blue" variant="light">
                Live Data
              </Badge>
            </Group>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder radius="md" padding="lg" h={400}>
            <Text fw={600} size="lg" mb="md">
              Module Usage
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={moduleUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {moduleUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Stack gap="xs" mt="md">
              {moduleUsageData.map((item, index) => (
                <Group key={index} justify="space-between">
                  <Group gap="xs">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: item.color,
                        borderRadius: "50%",
                      }}
                    />
                    <Text size="sm">{item.name}</Text>
                  </Group>
                  <Text size="sm" fw={500}>
                    {item.value}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Revenue and Language Stats */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" padding="lg">
            <Text fw={600} size="lg" mb="md">
              Revenue vs Target
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" padding="lg">
            <Text fw={600} size="lg" mb="md">
              Language Distribution
            </Text>
            <Stack gap="md">
              {languageStats.map((lang, index) => (
                <div key={index}>
                  <Group justify="space-between" mb={5}>
                    <Group gap="xs">
                      <Text size="lg">{lang.flag}</Text>
                      <Text size="sm" fw={500}>
                        {lang.language}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm">{lang.users} users</Text>
                      <Badge size="sm" color="blue" variant="light">
                        {lang.percentage}%
                      </Badge>
                    </Group>
                  </Group>
                  <Progress value={lang.percentage} color="blue" size="sm" />
                </div>
              ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Activity and Alerts */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder radius="md" padding="lg">
            <Group justify="space-between" mb="md">
              <Text fw={600} size="lg">
                Recent Activity
              </Text>
              <Button variant="subtle" size="xs">
                View All
              </Button>
            </Group>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Action</Table.Th>
                  <Table.Th>Module</Table.Th>
                  <Table.Th>Time</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentActivities.map((activity, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="sm" radius="xl" color="blue">
                          {activity.avatar}
                        </Avatar>
                        <Text size="sm" fw={500}>
                          {activity.user}
                        </Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{activity.action}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge size="sm" color="grape" variant="light">
                        {activity.module}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">
                        {activity.time}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon variant="subtle" size="sm">
                          <Eye size={14} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size="sm" color="blue">
                          <Edit size={14} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            {/* System Alerts */}
            <Card withBorder radius="md" padding="lg">
              <Group justify="space-between" mb="md">
                <Text fw={600} size="lg">
                  System Alerts
                </Text>
                <ThemeIcon variant="light" color="orange" size="sm">
                  <Bell size={16} />
                </ThemeIcon>
              </Group>
              <Stack gap="sm">
                {systemAlerts.map((alert, index) => (
                  <Alert
                    key={index}
                    variant="light"
                    color={
                      alert.type === "warning"
                        ? "orange"
                        : alert.type === "info"
                        ? "blue"
                        : "green"
                    }
                    icon={
                      alert.type === "warning" ? (
                        <AlertTriangle size={16} />
                      ) : alert.type === "info" ? (
                        <Info size={16} />
                      ) : (
                        <CheckCircle size={16} />
                      )
                    }
                  >
                    <Text size="sm">{alert.message}</Text>
                    <Text size="xs" c="dimmed">
                      {alert.time}
                    </Text>
                  </Alert>
                ))}
              </Stack>
            </Card>

            {/* Quick Stats */}
            <Card withBorder radius="md" padding="lg">
              <Text fw={600} size="lg" mb="md">
                Quick Stats
              </Text>
              <Stack gap="md">
                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon variant="light" color="blue" size="sm">
                      <Database size={16} />
                    </ThemeIcon>
                    <Text size="sm">Database Size</Text>
                  </Group>
                  <Text size="sm" fw={500}>
                    2.4 GB
                  </Text>
                </Group>

                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon variant="light" color="green" size="sm">
                      <Zap size={16} />
                    </ThemeIcon>
                    <Text size="sm">Server Load</Text>
                  </Group>
                  <Badge color="green" size="sm">
                    Normal
                  </Badge>
                </Group>

                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon variant="light" color="orange" size="sm">
                      <Clock size={16} />
                    </ThemeIcon>
                    <Text size="sm">Uptime</Text>
                  </Group>
                  <Text size="sm" fw={500}>
                    99.8%
                  </Text>
                </Group>

                <Group justify="space-between">
                  <Group gap="xs">
                    <ThemeIcon variant="light" color="grape" size="sm">
                      <UserCheck size={16} />
                    </ThemeIcon>
                    <Text size="sm">Online Users</Text>
                  </Group>
                  <Text size="sm" fw={500}>
                    1,247
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Performance Metrics */}
      <Card withBorder radius="md" padding="lg">
        <Text fw={600} size="lg" mb="md">
          Performance Metrics
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xl">
          <div style={{ textAlign: "center" }}>
            <RingProgress
              size={120}
              thickness={8}
              sections={[{ value: 87, color: "blue" }]}
              label={
                <Center>
                  <Text size="sm" fw={500}>
                    87%
                  </Text>
                </Center>
              }
            />
            <Text size="sm" mt="xs" c="dimmed">
              CPU Usage
            </Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <RingProgress
              size={120}
              thickness={8}
              sections={[{ value: 62, color: "green" }]}
              label={
                <Center>
                  <Text size="sm" fw={500}>
                    62%
                  </Text>
                </Center>
              }
            />
            <Text size="sm" mt="xs" c="dimmed">
              Memory
            </Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <RingProgress
              size={120}
              thickness={8}
              sections={[{ value: 94, color: "orange" }]}
              label={
                <Center>
                  <Text size="sm" fw={500}>
                    94%
                  </Text>
                </Center>
              }
            />
            <Text size="sm" mt="xs" c="dimmed">
              Storage
            </Text>
          </div>

          <div style={{ textAlign: "center" }}>
            <RingProgress
              size={120}
              thickness={8}
              sections={[{ value: 78, color: "grape" }]}
              label={
                <Center>
                  <Text size="sm" fw={500}>
                    78%
                  </Text>
                </Center>
              }
            />
            <Text size="sm" mt="xs" c="dimmed">
              Network
            </Text>
          </div>
        </SimpleGrid>
      </Card>
    </div>
  );
};

export default Dashboard;
