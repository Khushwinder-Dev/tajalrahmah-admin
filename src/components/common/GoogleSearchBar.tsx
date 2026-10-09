import { useState, useRef, useEffect } from "react";
import { Search, Clock, TrendingUp, X, Mic, Camera } from "lucide-react";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "suggestion" | "recent" | "trending";
  icon?: React.ReactNode;
}

interface GoogleSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
  showMic?: boolean;
  showCamera?: boolean;
  className?: string;
}

const GoogleSearchBar: React.FC<GoogleSearchBarProps> = ({
  onSearch,
  placeholder = "Search Google or type a URL",
  //   suggestions = [],
  showMic = true,
  showCamera = true,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "google meet",
    "whatsapp web",
    "react tutorial",
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  //   const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on current query
  const generateSuggestions = (searchQuery: string): SearchSuggestion[] => {
    if (!searchQuery.trim()) {
      // Show recent searches when no query
      return recentSearches.slice(0, 5).map((search, index) => ({
        id: `recent-${index}`,
        text: search,
        type: "recent" as const,
      }));
    }

    // Generate autocomplete suggestions like Google
    const baseSuggestions = [
      "download",
      "app",
      "join",
      "download for pc",
      "link",
      "login",
      "online",
      "download for windows 10",
    ];

    const querySuggestions: SearchSuggestion[] = [];

    // Add the exact query first
    querySuggestions.push({
      id: `query-exact`,
      text: searchQuery,
      type: "suggestion",
    });

    // Add autocomplete variations
    baseSuggestions.forEach((suffix, index) => {
      const suggestion = `${searchQuery} ${suffix}`;
      querySuggestions.push({
        id: `suggestion-${index}`,
        text: suggestion,
        type: "suggestion",
      });
    });

    // Add recent searches that match
    recentSearches
      .filter(
        (search) =>
          search.toLowerCase().includes(searchQuery.toLowerCase()) &&
          search.toLowerCase() !== searchQuery.toLowerCase()
      )
      .forEach((search, index) => {
        querySuggestions.push({
          id: `recent-match-${index}`,
          text: search,
          type: "recent",
        });
      });

    return querySuggestions.slice(0, 10);
  };

  const allSuggestions = generateSuggestions(query);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && e.key !== "ArrowDown") return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((prev) =>
            prev < allSuggestions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(allSuggestions[highlightedIndex].text);
        } else if (query.trim()) {
          handleSearch(query);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
    handleSearch(suggestion);
  };

  // Handle search
  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s !== searchQuery);
        return [searchQuery, ...filtered].slice(0, 8);
      });

      onSearch?.(searchQuery);
      setIsOpen(false);
    }
  };

  // Handle clear
  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Render suggestion text with highlighting
  const renderSuggestionText = (suggestion: SearchSuggestion) => {
    const text = suggestion.text;
    const queryLower = query.toLowerCase();
    const textLower = text.toLowerCase();

    if (!query || !textLower.includes(queryLower)) {
      return <span>{text}</span>;
    }

    const index = textLower.indexOf(queryLower);
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    return (
      <span>
        {before}
        <strong className="font-normal text-gray-900">{match}</strong>
        <span className="text-gray-600">{after}</span>
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto ${className}`}
    >
      {/* Main Search Container */}
      <div
        className={`
        relative bg-white rounded-full transition-all duration-200 overflow-hidden
        ${
          isOpen
            ? "rounded-b-none shadow-lg border border-gray-200"
            : "shadow-md border border-gray-200 hover:shadow-lg"
        }
      `}
      >
        {/* Search Input */}
        <div className="flex items-center w-full h-12">
          {/* Search Icon */}
          <div className="pl-4 pr-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 py-3 px-1 text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none text-base"
            autoComplete="off"
          />

          {/* Right Side Icons */}
          <div className="flex items-center pr-3 space-x-1">
            {query && (
              <button
                onClick={handleClear}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            )}

            {showMic && (
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Mic className="h-5 w-5 text-blue-500" />
              </button>
            )}

            {showCamera && (
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Camera className="h-5 w-5 text-blue-500" />
              </button>
            )}

            <button
              onClick={() => query && handleSearch(query)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="h-5 w-5 text-blue-500" />
            </button>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && (
          <div className="bg-white border-t border-gray-100">
            {allSuggestions.length > 0 ? (
              <ul className="py-1">
                {allSuggestions.map((suggestion, index) => (
                  <li key={suggestion.id}>
                    <button
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`
                        w-full flex items-center px-4 py-2 text-left transition-colors text-sm
                        ${
                          index === highlightedIndex
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                        }
                      `}
                    >
                      <div className="mr-3 flex-shrink-0">
                        {suggestion.type === "recent" ? (
                          <Clock className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Search className="h-4 w-4 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-1 text-gray-700">
                        {renderSuggestionText(suggestion)}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center text-sm">
                No suggestions
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-2 text-right">
              <span className="text-xs text-gray-500">
                Report inappropriate predictions
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo Component
export default function SearchDemo() {
  const [searchResults, setSearchResults] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchResults(`Searching for: "${query}"`);
    console.log("Searching for:", query);
  };

  const customSuggestions: SearchSuggestion[] = [
    {
      id: "1",
      text: "react hooks tutorial",
      type: "trending",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    { id: "2", text: "typescript best practices", type: "suggestion" },
    { id: "3", text: "tailwind css grid system", type: "suggestion" },
    {
      id: "4",
      text: "javascript promises explained",
      type: "trending",
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Google-Style Search
          </h1>
          <p className="text-gray-600 text-lg">
            Experience autocomplete with keyboard navigation, recent searches,
            and trending suggestions
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <GoogleSearchBar
            onSearch={handleSearch}
            suggestions={customSuggestions}
            placeholder="Search anything..."
          />
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Search Result
            </h2>
            <p className="text-gray-600">{searchResults}</p>
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Real-time autocomplete suggestions
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Keyboard navigation (↑↓ Enter Escape)
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Recent searches with remove option
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Trending suggestions
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Voice and camera search icons
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Highlighted query matches
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-gray-900">Click:</strong>
                <span className="text-gray-600 ml-2">
                  Focus input and show suggestions
                </span>
              </div>
              <div>
                <strong className="text-gray-900">Type:</strong>
                <span className="text-gray-600 ml-2">
                  Filter suggestions in real-time
                </span>
              </div>
              <div>
                <strong className="text-gray-900">↑↓ Arrows:</strong>
                <span className="text-gray-600 ml-2">
                  Navigate through suggestions
                </span>
              </div>
              <div>
                <strong className="text-gray-900">Enter:</strong>
                <span className="text-gray-600 ml-2">
                  Select highlighted suggestion or search
                </span>
              </div>
              <div>
                <strong className="text-gray-900">Escape:</strong>
                <span className="text-gray-600 ml-2">
                  Close suggestions dropdown
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
