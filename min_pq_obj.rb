class MinPqObj

  attr_reader :size

  def initialize(n)
    @arr = Array.new(n+1)
    @arr[0] = 'unused'
    @size = 0
  end

  def insert(elem)
    @size += 1
    @arr[@size] = elem
    swim(@size)
  end

  def min()
    @arr[1]
  end

  def del_min()
    if @size > 0
      min = @arr[1]
      @arr[1] = @arr[@size]
      @arr[@size] = nil
      @size -= 1
      #@arr.pop
      sink(1)
      return min
    end
  end

  def empty?
    @size == 0
    #@arr.size == 1
  end

  def any?
    !empty?
  end

  def to_s
    @arr[1..@size].inject("") do |str, elem|
      str << "#{elem.key} -> #{elem.value}\n"
    end
  end

  private

  def swim(index)
    return if index == 1

    parent_index = index / 2
    if less(index, parent_index)
      exchange(index, parent_index)
      swim(parent_index)
    end
  end

  def sink(index)
    child_index = 2*index
    return if child_index >= @size

    child_index+=1 if (child_index < @size && less(child_index+1, child_index))
    if less(child_index, index)
      exchange(child_index, index) 
      sink(child_index)
    end
  end

  def less(a, b)
    @arr[a].key < @arr[b].key
  end

  def exchange(a, b)
    tmp = @arr[a]
    @arr[a] = @arr[b]
    @arr[b] = tmp
  end

end

 #min_pq = MinPqObj.new

 #Elem = Struct.new(:key, :value)

 #min_pq.insert(Elem.new(20, "efg"))
 #min_pq.insert(Elem.new(1, "abc"))
 #min_pq.insert(Elem.new(2, "efg"))
 #puts min_pq.to_s
 ##puts min_pq.min
 #puts min_pq.del_min
 #puts min_pq.del_min
 #puts min_pq.del_min
 #puts min_pq.to_s

